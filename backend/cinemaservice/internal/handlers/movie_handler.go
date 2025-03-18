package handlers

import (
	"github.com/tuanngoo192003/golang-utils/utils"
	"cinema-service/infra/config"
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type MoviesHandler struct {
	db *gorm.DB
}

func NewMoviesHandler(db *gorm.DB) *MoviesHandler {
	return &MoviesHandler{db}
}

func (h *MoviesHandler) ListMovies(c *gin.Context) {
	log := config.GetLogger()

	var movies []payload.MoviesResponse

	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page <= 0 {
		page = utils.DEFAULT_PAGE
	}
	perpage, err := strconv.Atoi(c.Query("perpage"))
	if err != nil || page <= 0 {
		perpage = utils.DEFAULT_PAGE
	}

	movieName := c.Query("movieName")
	releaseStart := c.Query("releaseStart")
	releaseEnd := c.Query("releaseEnd")
	movieGenre := c.Query("movieGenre")

	query := h.db.Model(&entity.Seat{})
	
	if movieName != "" {
		query = query.Where(`
			to_tsvector('english', movie_name) @@ plainto_tsquery('english', CAST( ? AS TEXT))
			`, movieName)
	}
	if movieGenre != "" {
		query = query.Where("movie_genre IN ( ? ) ", movieName)
	}
	if releaseStart != "" && releaseEnd != "" {
		query = query.Where("release_date BETWEEN ? AND ?",
		c.DefaultQuery("releaseStart", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).String()),
		c.DefaultQuery("releaseEnd", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).String()))
	}
	query = query.Where("isDeleted = ?", c.Query("isDeleted"))

	var count int64
	if err := query.Count(&count).Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	offset := utils.GetOffset(page, &perpage)
	totalPage := utils.GetTotalPage(float32(count), &perpage)
	err = query.Model(&entity.Movie{}).
		Select(`users.user_id, users.email, users.status, users.first_name, users.last_name, 
				users.date_of_birth, users.phone_number, users.avatar, roles.role_name`).
		Offset(offset).
		Limit(perpage).
		Find(&movies).Error
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return 
	}

	c.JSON(http.StatusOK, payload.PaginationResponse[payload.MoviesResponse]{
		Page: page,
		Perpage: perpage, 
		Data: movies,
		TotalRecord: count,
		TotalPage: int64(totalPage),
	})

}

func (h *MoviesHandler) CreateMovie(c *gin.Context) {
	log := config.GetLogger()

	var movie payload.MoviesRequest 
	if err := c.ShouldBindJSON(&movie); err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": err.Error}})
		return
	}

	response := h.db.Model(&entity.Movie{}).Create(&movie)

	if response.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": response.Error.Error()})
		return
	}
	log.Info("Created new auditorium: ", movie)
	c.JSON(http.StatusOK, gin.H{"data": movie})
}

func (h *MoviesHandler) UpdateMovie(c *gin.Context) {
	log := config.GetLogger()

	var movie payload.MoviesRequest
	err := c.ShouldBindJSON(&movie)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var movieUpdate entity.Movie
	if movie.MovieName != "" { movieUpdate.MovieName = movie.MovieName }
	if movie.Description != "" { movieUpdate.Description = movie.Description }
	if movie.MovieGenre != "" { movieUpdate.MovieGenre = movie.MovieGenre }

	if err := h.db.Model(entity.Movie{}).Where(`movie_id = ?`, movie.ID).Updates(&movieUpdate).Error; err != nil {
		log.Error(err.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": movieUpdate})
}

