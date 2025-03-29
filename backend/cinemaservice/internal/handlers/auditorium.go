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
type AuditoriumsHandler struct {
	db *gorm.DB
}

// NewAuditoriumHandler will create a new auditorium handler
func NewAuditoriumHandler(db *gorm.DB) *AuditoriumsHandler {
	return &AuditoriumsHandler{db}
}
func (a *AuditoriumsHandler) Create(c *gin.Context) {
	log := config.GetLogger()
	var req payload.AuditoriumRequest
	err := c.ShouldBindJSON(&req)

	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var obj entity.Auditorium
	payload.MapStruct(req, &obj)
	result := a.db.Create(&obj)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}
	var response payload.AuditoriumResponse
	payload.MapStruct(obj, &response)

	log.Info("Created new auditorium: ", response)
	c.JSON(http.StatusOK, gin.H{"data": response})
}

func (a *AuditoriumsHandler) Update(c *gin.Context) {
	log := config.GetLogger()

	var req payload.AuditoriumRequest

	id, _ := strconv.Atoi(c.Param("id"))
	err := c.ShouldBindJSON(&req)
	var obj entity.Auditorium
	payload.MapStruct(req, &obj)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := a.db.Model(&entity.Auditorium{}).Where("id = ?", id).Updates(&obj).Error; err != nil {
		log.Error(err.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	a.db.Model(&entity.Auditorium{}).First(&obj, id)
	var response payload.AuditoriumResponse
	payload.MapStruct(obj, &response)

	c.JSON(http.StatusOK, gin.H{"data": response})

}

func (a *AuditoriumsHandler) Search(c *gin.Context) {
	log := config.GetLogger()
	query := a.db.Model(&entity.Auditorium{})

	if c.Query("auditoriumName") != "" {
		query = query.Where("Auditorium_Name = ?", c.Query("auditoriumName"))
	}
	if c.Query("capacity") != "" {
		res, _ := strconv.Atoi(c.Query("capacity"))
		query = query.Where("capacity = ?", res)
	}
	if c.Query("id") != "" {
		res, _ := strconv.Atoi(c.Query("id"))
		query = query.Where("ID = ?", res)
	}
	if c.Query("isDeleted") != "" {

		query = query.Where("Is_Deleted = ?", c.Query("isDeleted"))
	}
	const timeFormat = "2006-01-02 15:04:05"
	query = query.Where("created_At BETWEEN ? AND ?",
		c.DefaultQuery("createdStart", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)),
		c.DefaultQuery("createdEnd", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)))

	query = query.Where("last_modified_at BETWEEN ? AND ?",
		c.DefaultQuery("lastModifiedStart", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)),
		c.DefaultQuery("lastModifiedEnd", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)))

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

	var obj []entity.Auditorium

	result := query.Offset(offset).Limit(limit).Find(&obj)
	if result.Error != nil {
		log.Error(result.Error.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}
	var response []payload.AuditoriumResponse
	for _, auditorium := range obj {
		var res payload.AuditoriumResponse
		payload.MapStruct(auditorium, &res)
		response = append(response, res)
	}
	c.JSON(http.StatusOK, gin.H{"data": response})
}
