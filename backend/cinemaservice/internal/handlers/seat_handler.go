package handlers

import (
	"cinema-service/infra/config"
	"cinema-service/internal/domain/entity"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// AuditorimumHandler struct
type SeatHandler struct {
	db *gorm.DB
}

// NewAuditoriumHandler will create a new auditorium handler
func NewSeatHandler(db *gorm.DB) *SeatHandler {
	return &SeatHandler{db}
}
func (s *SeatHandler) Search(c *gin.Context) {
	log := config.GetLogger()

	// Khởi tạo query
	query := s.db.Model(&entity.Seat{})

	if c.Query("seatCode") != "" {
		query = query.Where("seat_code = ?", c.Query("seatCode"))
	}
	if c.Query("authoriumId") != "" {
		query = query.Where("authorium_id = ?", c.Query("authoriumId"))
	}
	if c.Query("id") != "" {
		query = query.Where("id = ?", c.Query("id"))
	}
	if c.Query("currentStatus") != "" {
		query = query.Where("currentStatus = ?", c.Query("currentStatus"))
	}
	if c.Query("isDeleted") != "" {
		query = query.Where("isDeleted = ?", c.Query("isDeleted"))
	}

	query = query.Where("created_at BETWEEN ? AND ?",
		c.DefaultQuery("createdStart", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).String()),
		c.DefaultQuery("createdEnd", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).String()))

	query = query.Where("last_modified_at BETWEEN ? AND ?",
		c.DefaultQuery("lastModifiedStart", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).String()),
		c.DefaultQuery("lastModifiedEnd", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).String()))

	offset, err := strconv.Atoi(c.DefaultQuery("offset", "0"))
	if err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	limit, err := strconv.Atoi(c.DefaultQuery("limit", "10"))
	if err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var seats []entity.Seat
	response := query.Offset(offset).Limit(limit).Find(&seats)

	if response.Error != nil {
		log.Error(response.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": response.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": seats})
}
