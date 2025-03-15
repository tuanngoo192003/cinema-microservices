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
type AuditoriumsHandler struct {
	db *gorm.DB
}

// NewAuditoriumHandler will create a new auditorium handler
func NewAuditoriumHandler(db *gorm.DB) *AuditoriumsHandler {
	return &AuditoriumsHandler{db}
}
func (a *AuditoriumsHandler) Create(c *gin.Context) {
	log := config.GetLogger()

	var obj schema.Authorium

	log.Info("Creating new auditorium")
	err := c.ShouldBindJSON(&obj)

	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := a.db.Create(&obj)

	if response.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": response.Error})
	}
	log.Info("Created new auditorium: ", obj)
	c.JSON(http.StatusOK, gin.H{"data": obj})
}

func (a *AuditoriumsHandler) Update(c *gin.Context) {
	log := config.GetLogger()

	var obj schema.Authorium
	err := c.ShouldBindJSON(&obj)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	find := a.db.First(&AuditoriumsHandler{}, obj.ID)
	if find.Error != nil {
		log.Error(find.Error)

		c.JSON(http.StatusBadRequest, gin.H{"error": find.Error})
		return
	}

	reponse := a.db.Save(&obj)
	if reponse.Error != nil {
		log.Error(reponse.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": reponse.Error})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": obj})

}
func (a *AuditoriumsHandler) Search(c *gin.Context) {
	log := config.GetLogger()
	a.db.Model(&schema.Authorium{})

	if c.Query("name") != "" {
		a.db.Where("name = ?", c.Query("name"))
	}
	if c.Query("cinema_id") != "" {
		a.db.Where("cinema_id = ?", c.Query("cinema_id"))
	}
	if c.Query("id") != "" {
		a.db.Where("id = ?", c.Query("id"))
	}
	if c.Query("is_Deleted") != "" {
		a.db.Where("is_Deleted = ?", c.Query("is_Deleted"))
	}
	a.db.Where("created_at BETWEEN ? AND ?",
		c.DefaultQuery("created_start", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).String()),
		c.DefaultQuery("created_start", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).String()))

	a.db.Where("last_modified_at BETWEEN ? AND ?",
		c.DefaultQuery("last_modified_start", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).String()),
		c.DefaultQuery("last_modified_start", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).String()))

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

	var result *[]schema.Authorium
	response := a.db.Offset(offset).Limit(limit).Find(&result)
	if response.Error != nil {
		log.Error(response.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": response.Error})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": result})
}
