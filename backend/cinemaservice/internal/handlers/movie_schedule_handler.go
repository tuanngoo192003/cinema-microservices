package handlers

import (
	"cinema-service/infra/config"
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/tuanngoo192003/golang-utils/utils"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type MovieScheduleHander struct {
	db *gorm.DB
}

func NewMovieScheduleHandler(db *gorm.DB) *MovieScheduleHander {
	return &MovieScheduleHander{
		db: db,
	}
}

func (h *MovieScheduleHander) CreateMovieSchedule(c *gin.Context) {
	log := config.Newlogger(config.ConfigLogger{})
	var movieSchedule payload.MovieScheduleRequest

	if err := c.ShouldBindJSON(&movieSchedule); err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": err.Error()}})
		return
	}

	format := time.RFC3339
	startAtTime, err := time.Parse(movieSchedule.StartAt, format)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": err.Error()}})
		return
	}
	endAtTime, err := time.Parse(movieSchedule.EndAt, format)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": err.Error()}})
		return
	}
	movieScheduleEntity := entity.MovieSchedule{
		MovieID:        movieSchedule.MovieID,
		AuditoriumID:   movieSchedule.AuditoriumID,
		StartAt:        startAtTime,
		EndAt:          endAtTime,
		ScheduleStatus: movieSchedule.ScheduleStatus,
	}

	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{
		SkipDefaultTransaction: true,
	})
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{
			"error":   err.Error(),
			"message": "Failed to start sqlite",
		}})
		return
	}

	tx := db.Session(&gorm.Session{SkipDefaultTransaction: true})
	if err := tx.Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{
			"error":   err.Error(),
			"message": "Failed to open session",
		}})
		tx.Rollback()
		return
	}

	response := tx.Create(&movieScheduleEntity)
	if err := response.Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{
			"error":   err.Error(),
			"message": "Created movie schedule failed",
		}})
		tx.Rollback()
		return
	}

	seats := generateSeats(movieScheduleEntity.AuditoriumID)
	response = tx.Create(seats)
	if err := response.Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{
			"error":   err.Error(),
			"message": "Created seats failed",
		}})
		tx.Rollback()
		return
	}

	tx.Commit()
	log.Info("Created movie schedule successfully!")
	c.JSON(http.StatusOK, gin.H{"data": movieScheduleEntity})
}

func generateSeats(auditoriumID uint) (seats []entity.Seat) {
	char := 'A'
	for i := 0; i < 10; i++ {
		for j := 1; j <= 12; j++ {
			seat := entity.Seat{
				AuthoriumID:   auditoriumID,
				CurrentStatus: "AVAILABLE",
				SeatCode:      fmt.Sprintf("%c%d", char, j),
			}
			seats = append(seats, seat)
		}
		char++ // Move to the next row (A → B → C → ... → J)
	}
	return seats
}

func (h *MovieScheduleHander) UpdateMovieSchedule(c *gin.Context) {
	log := config.GetLogger()

	var req payload.UpdateScheduleRequest
	err := c.ShouldBindJSON(&req)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	find := h.db.First(&entity.MovieSchedule{}, req.ID)
	if find.Error != nil {
		log.Error(find.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": find.Error.Error()})
		return
	}
	var obj entity.MovieSchedule
	payload.MapStruct(req, &obj)

	reponse := h.db.Save(obj)
	if reponse.Error != nil {
		log.Error(reponse.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": reponse.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": obj})
}

func (h *MovieScheduleHander) ListMovieSchedules(c *gin.Context) {
	log := config.GetLogger()
	query := h.db.Model(&entity.MovieSchedule{})

	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page <= 0 {
		page = utils.DEFAULT_PAGE
	}
	perpage, err := strconv.Atoi(c.Query("perpage"))
	if err != nil || page <= 0 {
		perpage = utils.DEFAULT_PAGE
	}

	if c.Query("movieId") != "" {
		query = query.Where("movieId = ?", c.Query("movie_id"))
	}
	if c.Query("auditoriumUd") != "" {
		res, _ := strconv.Atoi(c.Query("auditoriumId"))
		query = query.Where("auditorium_id = ?", res)
	}
	if c.Query("id") != "" {
		res, _ := strconv.Atoi(c.Query("id"))
		query = query.Where("ID = ?", res)
	}
	if c.Query("isDeleted") != "" {

		query = query.Where("Is_Deleted = ?", c.Query("isDeleted"))
	}
	if c.Query("createdBy") != "" {

		query = query.Where("created_by = ?", c.Query("createdBy"))
	}
	if c.Query("lastModifiedBy") != "" {
		query = query.Where("last_modified_by = ?", c.Query("lastModifiedBy"))
	}

	const timeFormat = "2006-01-02 15:04:05"

	query = query.Where("start_at BETWEEN ? AND ?",
		c.DefaultQuery("startUpper", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)),
		c.DefaultQuery("startLower", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)))

	query = query.Where("end_at BETWEEN ? AND ?",
		c.DefaultQuery("endUpper", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)),
		c.DefaultQuery("endLower", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)))

	query = query.Where("last_modified_at BETWEEN ? AND ?",
		c.DefaultQuery("lastModifiedStart", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)),
		c.DefaultQuery("lastModifiedEnd", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)))
	query = query.Where("created_At BETWEEN ? AND ?",
		c.DefaultQuery("createdStart", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)),
		c.DefaultQuery("createdEnd", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)))

	query = query.Where("last_modified_at BETWEEN ? AND ?",
		c.DefaultQuery("lastModifiedStart", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)),
		c.DefaultQuery("lastModifiedEnd", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)))

	var count int64
	if err := query.Count(&count).Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	offset := utils.GetOffset(page, &perpage)
	totalPage := utils.GetTotalPage(float32(count), &perpage)

	var result []payload.ScheduleResponse
	response := query.Offset(offset).Limit(perpage).Find(&result)

	if response.Error != nil {
		log.Error(response.Error.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": response.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, payload.PaginationResponse[payload.ScheduleResponse]{
		Page:        page,
		Perpage:     perpage,
		Data:        result,
		TotalRecord: count,
		TotalPage:   int64(totalPage),
	})

	c.JSON(http.StatusOK, gin.H{"data": result})
}

func (h *MovieScheduleHander) GetMovieSchedule(c *gin.Context) {
	log := config.Newlogger(config.ConfigLogger{})
	id := c.Query("id")
	if id == "" {
		log.Info("Parameter id is required but not found!")
		c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": "Parameter id is required but not found!"}})
		return
	}
	var movieSchedule entity.MovieSchedule
	if err := h.db.Model(&entity.MovieSchedule{}).Where(`movie_schedule_id = ?`, id).Preload("movie").Scan(&movieSchedule); err != nil {
		log.Error(err.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": err.Error}})
		return
	}
	c.JSON(http.StatusOK, payload.GetByIDMovieScheduleResponse{
		ID: movieSchedule.ID,
		Movie: payload.MovieResponse{
			MovieID:     movieSchedule.Movie.MovieID,
			MovieName:   movieSchedule.Movie.MovieName,
			Description: movieSchedule.Movie.Description,
			ReleaseDate: movieSchedule.Movie.ReleaseDate,
			MovieGenre:  movieSchedule.Movie.MovieGenre,
		},
		AuditoriumID:   movieSchedule.AuditoriumID,
		StartAt:        movieSchedule.StartAt.String(),
		EndAt:          movieSchedule.EndAt.String(),
		ScheduleStatus: movieSchedule.ScheduleStatus,
	})
}
