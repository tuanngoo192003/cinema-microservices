package handlers

import (
	"cinema-service/infra/config"
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"
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
func (s *SeatHandler) ListSeats(c *gin.Context) {
	log := config.GetLogger()

	// Khởi tạo query
	query := s.db.Model(&entity.Seat{})

	if c.Query("seatCode") != "" {
		query = query.Where("seat_code = ?", c.Query("seatCode"))
	}
	if c.Query("auditoriumId") != "" {
		query = query.Where("auditorium_id = ?", c.Query("auditoriumId"))
	}
	if c.Query("id") != "" {
		query = query.Where("id = ?", c.Query("id"))
	}
	if c.Query("currentStatus") != "" {
		query = query.Where("current_status = ?", c.Query("currentStatus"))
	}
	if c.Query("isDeleted") != "" {
		query = query.Where("is_deleted = ?", c.Query("isDeleted"))
	}

	timeFormat := "2006-01-02T15:04:05.000Z"
	query = query.Where("last_modified_at BETWEEN ? AND ?",
		c.DefaultQuery("lastModifiedStart", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)),
		c.DefaultQuery("lastModifiedEnd", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)))
	query = query.Where("created_at BETWEEN ? AND ?",
		c.DefaultQuery("createdStart", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)),
		c.DefaultQuery("createdEnd", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)))

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

	var obj []entity.Seat
	result := query.Offset(offset).Limit(limit).Find(&obj)

	if result.Error != nil {
		log.Error(result.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}
	var response []payload.SeatReponse
	for _, i := range obj {
		var temp payload.SeatReponse
		payload.MapStruct(i, &temp)
		response = append(response, temp)

	}

	c.JSON(http.StatusOK, gin.H{"data": response})
}

func (s *SeatHandler) Create(c *gin.Context) {
	log := config.GetLogger()
	s.db.Model(&entity.Seat{})
	var req payload.CreateSeatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var obj entity.Seat
	payload.MapStruct(req, &obj)
	if err := s.db.Create(&obj).Error; err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var response payload.SeatReponse
	payload.MapStruct(obj, &response)

	c.JSON(http.StatusOK, gin.H{"data": response})
}

func (s *SeatHandler) Update(c *gin.Context) {
	log := config.GetLogger()
	s.db.Model(&entity.Seat{})
	var req payload.UpdateSeatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	id, _ := strconv.Atoi(c.Param("id"))
	var obj entity.Seat

	payload.MapStruct(req, &obj)
	if err := s.db.Model(&entity.Seat{}).Where(`id = ?`, id).Updates(&obj).Error; err != nil {
		log.Error(err.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	s.db.Model(&entity.Seat{}).First(&obj, id)
	var response payload.SeatReponse
	payload.MapStruct(obj, &response)

	c.JSON(http.StatusOK, gin.H{"data": response})
}
