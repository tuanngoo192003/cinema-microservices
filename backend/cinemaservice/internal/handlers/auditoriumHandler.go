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

	var obj schema.Auditorium

	log.Info("Creating new auditorium")
	err := c.ShouldBindJSON(&obj)

	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := a.db.Create(&obj)

	if response.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": response.Error.Error()})
		return
	}
	log.Info("Created new auditorium: ", obj)
	c.JSON(http.StatusOK, gin.H{"data": obj})
}

func (a *AuditoriumsHandler) Update(c *gin.Context) {
	log := config.GetLogger()

	var obj schema.Auditorium
	err := c.ShouldBindJSON(&obj)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	find := a.db.First(&schema.Auditorium{}, obj.ID)
	if find.Error != nil {
		log.Error(find.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": find.Error.Error()})
		return
	}

	reponse := a.db.Save(obj)
	if reponse.Error != nil {
		log.Error(reponse.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": reponse.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": obj})

}
func (a *AuditoriumsHandler) Search(c *gin.Context) {
	log := config.GetLogger()
	query := a.db.Model(&schema.Auditorium{})

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

	var result []schema.Auditorium
	response := query.Offset(offset).Limit(limit).Find(&result)
	if response.Error != nil {
		log.Error(response.Error.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": response.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": result})
}
