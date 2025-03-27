package handlers

import (
	"cinema-service/infra/config"
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ReservedSeatHandler struct {
	db *gorm.DB
}

func NewReservedSeatHandler(db *gorm.DB) *ReservedSeatHandler {
	return &ReservedSeatHandler{db}
}
func (r *ReservedSeatHandler) Search(c *gin.Context) {
	log := config.GetLogger()

	// Khởi tạo query
	query := r.db.Model(&entity.ReservedSeat{})

	if c.Query("seatId") != "" {
		query = query.Where("seat_id = ?", c.Query("seatId"))
	}
	if c.Query("userId") != "" {
		query = query.Where("user_id = ?", c.Query("userId"))
	}
	if c.Query("scheduleId") != "" {
		query = query.Where("schedule_id = ?", c.Query("scheduleId"))
	}
	if c.Query("id") != "" {
		query = query.Where("id = ?", c.Query("id"))
	}

	var reservedSeats []entity.ReservedSeat
	var response []payload.ReservedSeatReponse
	result := query.Find(&reservedSeats)
	if result.Error != nil {
		log.Error(result.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}
	for i := range reservedSeats {
		var res payload.ReservedSeatReponse
		payload.MapStruct(reservedSeats[i], &res)
		response = append(response, res)
	}

	c.JSON(http.StatusOK, response)
}
func (r *ReservedSeatHandler) Create(c *gin.Context) {
	log := config.GetLogger()
	var req payload.ReservedSeatRequest
	err := c.ShouldBindJSON(&req)

	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var obj entity.ReservedSeat
	payload.MapStruct(req, &obj)
	result := r.db.Create(&obj)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}
	var response payload.ReservedSeatReponse
	payload.MapStruct(obj, &response)

	log.Info("Created new reserved seat: ", response)
	c.JSON(http.StatusOK, gin.H{"data": response})
}
