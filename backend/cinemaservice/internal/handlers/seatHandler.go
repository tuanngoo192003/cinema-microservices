package handlers

import (
	"cinema-service/internal/config"
	"cinema-service/internal/domain/schema"
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
	query := s.db.Model(&schema.Seat{})

	if c.Query("seat_code") != "" {
		query = query.Where("seat_code = ?", c.Query("seat_code"))
	}
	if c.Query("authorium_id") != "" {
		query = query.Where("authorium_id = ?", c.Query("authorium_id"))
	}
	if c.Query("id") != "" {
		query = query.Where("id = ?", c.Query("id"))
	}
	if c.Query("current_status") != "" {
		query = query.Where("current_status = ?", c.Query("current_status"))
	}
	if c.Query("is_deleted") != "" {
		query = query.Where("is_deleted = ?", c.Query("is_deleted"))
	}

	query = query.Where("created_at BETWEEN ? AND ?",
		c.DefaultQuery("created_start", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).String()),
		c.DefaultQuery("created_end", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).String()))

	query = query.Where("last_modified_at BETWEEN ? AND ?",
		c.DefaultQuery("last_modified_start", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).String()),
		c.DefaultQuery("last_modified_end", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).String()))

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

	var seats []schema.Seat
	response := query.Offset(offset).Limit(limit).Find(&seats)

	if response.Error != nil {
		log.Error(response.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": response.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": seats})
}
