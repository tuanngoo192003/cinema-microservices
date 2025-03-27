package handlers

import (
	"cinema-service/infra/config"
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"
	"net/http"
	"strconv"
	"time"

	"github.com/tuanngoo192003/golang-utils/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type MoviesHandler struct {
	db *gorm.DB
}

func NewMoviesHandler(db *gorm.DB) *MoviesHandler {
	return &MoviesHandler{db}
}

func (m *MoviesHandler) Search(c *gin.Context) {
	log := config.GetLogger()
	query := m.db.Model(&entity.Movie{})

	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page <= 0 {
		page = utils.DEFAULT_PAGE
	}
	perpage, err := strconv.Atoi(c.Query("perpage"))
	if err != nil || page <= 0 {
		perpage = 15
	}

	movieName := c.Query("movieName")
	releaseStart := c.Query("releaseStart")
	releaseEnd := c.Query("releaseEnd")
	movieGenre := c.Query("movieGenre")

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
	query = query.Where("is_deleted = ?", false)

	var count int64

	if err := query.Count(&count).Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	offset := utils.GetOffset(page, &perpage)
	totalPage := utils.GetTotalPage(float32(count), &perpage)

	var movies []entity.Movie

	err = query.
		Offset(offset).
		Limit(perpage).
		Find(&movies).Error

	movieResponse := make([]payload.MovieResponse, min(count, int64(perpage)))

	for i := range movies {
		payload.MapStruct(movies[i], &movieResponse[i])
	}

	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, payload.PaginationResponse[payload.MovieResponse]{
		Page:        page,
		Perpage:     perpage,
		Data:        movieResponse,
		TotalRecord: count,
		TotalPage:   int64(totalPage),
	})

}

func (h *MoviesHandler) CreateMovie(c *gin.Context) {
	log := config.GetLogger()

	var createMovieDTO payload.CreateMovieRequest
	if err := c.ShouldBindJSON(&createMovieDTO); err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": err.Error}})
		return
	}
	var movie entity.Movie
	payload.MapStruct(createMovieDTO, &movie)

	if err := h.db.Create(&movie).Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	var movieResponse payload.MovieResponse
	payload.MapStruct(createMovieDTO, &movieResponse)

	c.JSON(http.StatusCreated, gin.H{"data": movie})
}

func (h *MoviesHandler) UpdateMovie(c *gin.Context) {
	log := config.GetLogger()

	var movie payload.UpdateMovieRequest

	id, _ := strconv.Atoi(c.Param("id"))

	err := c.ShouldBindJSON(&movie)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var obj entity.Movie
	payload.MapStruct(movie, &obj)
	obj.ID = uint(id)
	if err := h.db.Model(entity.Movie{}).Where(`movie_id = ?`, id).Updates(&obj).Error; err != nil {
		log.Error(err.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": obj})
}
