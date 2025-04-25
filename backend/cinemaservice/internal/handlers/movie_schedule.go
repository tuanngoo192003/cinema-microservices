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
	startAtTime, err := time.Parse(format, movieSchedule.StartAt)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": err.Error()}})
		return
	}
	endAtTime, err := time.Parse(format, movieSchedule.EndAt)
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

	tx := h.db.Begin()
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

	auditorium, err := getAuditoriumByID(movieScheduleEntity.AuditoriumID, h.db)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{
			"error":   err.Error(),
			"message": "AuditoriumID is not valid",
		}})
		tx.Rollback()
		return
	}
	log.Info(auditorium)
	seats := generateSeats(auditorium.AuditoriumID, movieScheduleEntity.ScheduleID, int(auditorium.Rows), int(auditorium.Cols), movieSchedule.MoviePrice)
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

func generateSeats(auditoriumID uint, scheduleID uint, rows int, cols int, moviePrice float64) []entity.Seat {
	var seats []entity.Seat
	char := 'A' // Starting letter for the first row

	for i := 0; i < rows; i++ { // Loop through rows
		for j := 1; j <= cols; j++ { // Loop through columns
			seat := entity.Seat{
				AuditoriumID:  auditoriumID, // Corrected typo: AuthoriumID -> AuditoriumID
				ScheduleID:    scheduleID,
				CurrentStatus: "AVAILABLE",
				SeatCode:      fmt.Sprintf("%c%d", char, j), // Format SeatCode as "A1", "A2", etc.
				Price:         moviePrice,
			}
			seats = append(seats, seat)
		}
		char++ // Move to the next row (A → B → C → ... → J) after finishing current row
	}
	return seats
}

func getAuditoriumByID(auditoriumID uint, db *gorm.DB) (ent *entity.Auditorium, err error) {
	ent = &entity.Auditorium{}

	if err = db.Select("auditorium_id, rows, cols").Where("auditorium_id = ?", auditoriumID).Find(ent).Error; err != nil {
		return nil, err
	}
	return
}

func (h *MovieScheduleHander) UpdateMovieSchedule(c *gin.Context) {
	log := config.GetLogger()

	var req payload.UpdateMovieScheduleRequest
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
		query = query.Where(" movie_id = ? ", c.Query("movieId"))
	}
	if c.Query("auditoriumId") != "" {
		res, _ := strconv.Atoi(c.Query("auditoriumId"))
		query = query.Where(" auditorium_id = ? ", res)
	}
	if c.Query("id") != "" {
		res, _ := strconv.Atoi(c.Query("id"))
		query = query.Where(" schedule_id = ? ", res)
	}
	layout := time.RFC3339
	if c.Query("startAt") != "" {
		startAt, err := time.Parse(layout, c.Query("startAt"))
		if err != nil {
			log.Error("Invalid startAt format:", err)
			c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": "Invalid date format"}})
			return
		}
		query = query.Where(" start_at >= ? ", startAt)
	}
	if c.Query("endAt") != "" {
		endAt, err := time.Parse(layout, c.Query("endAt"))
		if err != nil {
			log.Error("Invalid endAt format:", err)
			c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": "Invalid date format"}})
			return
		}
		query = query.Where(" end_at <= ? ", endAt)
	}

	query = query.Where(" is_deleted = false ")

	var count int64
	if err := query.Count(&count).Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	offset := utils.GetOffset(page, &perpage)
	totalPage := utils.GetTotalPage(float32(count), &perpage)

	var result []payload.MovieScheduleResponse
	response := query.
		Select(
			"s.schedule_id as id ", "s.movie_id",
			"(SELECT m.movie_name FROM movies m WHERE m.movie_id = s.movie_id) AS movie_name",
			"s.auditorium_id",
			"(SELECT a.auditorium_name FROM auditoriums a WHERE a.auditorium_id = s.auditorium_id) AS auditorium_name",
			"s.start_at", "s.end_at", "s.schedule_status",
			"(SELECT COUNT(*) FROM seats WHERE seats.schedule_id = s.schedule_id AND seats.current_status = 'AVAILABLE') AS seat_left").
		Table("movie_schedule AS s").
		Offset(offset).
		Limit(perpage).
		Find(&result)

	if response.Error != nil {
		log.Error(response.Error.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": response.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, payload.PaginationResponse[payload.MovieScheduleResponse]{
		Page:        page,
		Perpage:     perpage,
		Data:        result,
		TotalRecord: count,
		TotalPage:   int64(totalPage),
	})
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
	if err := h.db.Model(&entity.MovieSchedule{}).Where(` schedule_id = ? `, id).Preload("Movie").Find(&movieSchedule); err != nil {
		log.Error(err.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": err.Error}})
		return
	}
	c.JSON(http.StatusOK, payload.GetByIDMovieScheduleResponse{
		ID: movieSchedule.ScheduleID,
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

func (h *MovieScheduleHander) GetMovieScheduleDetails(c *gin.Context) {
	log := config.Newlogger(config.ConfigLogger{})
	id := c.Param("id")
	if id == "" {
		log.Info("Parameter id is required but not found!")
		c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": "Parameter id is required but not found!"}})
		return
	}
	var movieSchedule entity.MovieSchedule
	if err := h.db.Model(&entity.MovieSchedule{}).Where(` schedule_id = ? `, id).Preload("Movie").First(&movieSchedule).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": err.Error()}})
		return
	}

	var auditorium entity.Auditorium
	if err := h.db.Model(&entity.Auditorium{}).Where(` auditorium_id = ? `, movieSchedule.AuditoriumID).Find(&auditorium).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": err.Error()}})
		return
	}

	var seats []entity.Seat
	if err := h.db.Model(&entity.Seat{}).Where(" auditorium_id = ? ", movieSchedule.AuditoriumID).
		Where(" schedule_id = ?  ", movieSchedule.ScheduleID).
		Order(" seat_id ASC ").
		Find(&seats).Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": err.Error}})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payload.GetMovieScheduleDetailsResponse{
		ID: int(movieSchedule.ScheduleID),
		Movie: payload.MovieResponse{
			MovieID:     movieSchedule.Movie.MovieID,
			MovieName:   movieSchedule.Movie.MovieName,
			ImageURL:    movieSchedule.Movie.ImageURL,
			Duration:    movieSchedule.Movie.Duration,
			MoviePrice:  movieSchedule.Movie.MoviePrice,
			Description: movieSchedule.Movie.Description,
			ReleaseDate: movieSchedule.Movie.ReleaseDate,
			MovieGenre:  movieSchedule.Movie.MovieGenre,
		},
		Auditorium: payload.AuditoriumWithSeatResponse{
			AuditoriumID:   int(auditorium.AuditoriumID),
			AuditoriumName: auditorium.AuditoriumName,
			Rows:           int(auditorium.Rows),
			Columns:        int(auditorium.Cols),
			Seats:          setSeatsResponse(seats),
		},
		StartAt:        movieSchedule.StartAt.String(),
		EndAt:          movieSchedule.EndAt.String(),
		ScheduleStatus: movieSchedule.ScheduleStatus,
	}})
}

func setSeatsResponse(seats []entity.Seat) []payload.SeatInfoResponse {
	var res []payload.SeatInfoResponse
	for _, s := range seats {
		seatResponse := payload.SeatInfoResponse{
			ID:       int(s.SeatID),
			UserID:   int(s.UserID),
			SeatCode: s.SeatCode,
			Price:    s.Price,
			Status:   s.CurrentStatus,
		}
		res = append(res, seatResponse)
	}
	return res
}
