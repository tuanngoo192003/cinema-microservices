package handlers

import (
	"cinema-service/infra/config"
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/tuanngoo192003/golang-utils/utils"
	"gorm.io/gorm"
)

// AuditorimumHandler struct
type ScheduleHandler struct {
	db *gorm.DB
}

// NewAuditoriumHandler will create a new auditorium handler
func NewScheduleHandler(db *gorm.DB) *ScheduleHandler {
	return &ScheduleHandler{db}
}
func (a *ScheduleHandler) Create(c *gin.Context) {
	log := config.GetLogger()

	var req payload.CreateScheduleRequest

	log.Info("Creating new schedule")
	err := c.ShouldBindJSON(&req)
	var obj entity.Schedule
	payload.MapStruct(req, &obj)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	a.db.Model(&entity.Schedule{})
	result := a.db.Create(&obj)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}
	var response payload.ScheduleResponse
	payload.MapStruct(obj, &response)
	c.JSON(http.StatusOK, gin.H{"data": response})
}

func (a *ScheduleHandler) Update(c *gin.Context) {
	log := config.GetLogger()

	var req payload.UpdateScheduleRequest
	id, _ := strconv.Atoi(c.Param("id"))
	err := c.ShouldBindJSON(&req)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var obj entity.Schedule
	payload.MapStruct(req, &obj)

	if err := a.db.Model(&entity.Schedule{}).Where(`id = ?`, id).Updates(&obj).Error; err != nil {
		log.Error(err.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	a.db.Model(&entity.Schedule{}).First(&obj, id)
	var response payload.ScheduleResponse
	payload.MapStruct(obj, &response)
	c.JSON(http.StatusOK, gin.H{"data": response})

}
func (a *ScheduleHandler) Delete(c *gin.Context) {
	log := config.GetLogger()

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var obj entity.Schedule

	obj.IsDeleted = true
	if err := a.db.Model(entity.Schedule{}).Where(`id = ?`, id).Updates(&obj).Error; err != nil {
		log.Error(err.Error)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	a.db.Model(&entity.Schedule{}).First(&obj, id)

	var response payload.ScheduleResponse
	payload.MapStruct(obj, &response)

	c.JSON(http.StatusOK, gin.H{"data": response})
}

func (a *ScheduleHandler) Search(c *gin.Context) {
	log := config.GetLogger()
	query := a.db.Model(&entity.Schedule{})

	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page <= 0 {
		page = utils.DEFAULT_PAGE
	}
	perpage, err := strconv.Atoi(c.Query("perpage"))
	if err != nil || page <= 0 {
		perpage = utils.DEFAULT_PAGE
	}

	if c.Query("movieId") != "" {
		query = query.Where("movieId = ?", c.Query("movie_id"))
	}
	if c.Query("auditoriumUd") != "" {
		res, _ := strconv.Atoi(c.Query("auditoriumId"))
		query = query.Where("auditorium_id = ?", res)
	}
	if c.Query("id") != "" {
		res, _ := strconv.Atoi(c.Query("id"))
		query = query.Where("ID = ?", res)
	}
	if c.Query("isDeleted") != "" {

		query = query.Where("Is_Deleted = ?", c.Query("isDeleted"))
	}
	if c.Query("createdBy") != "" {

		query = query.Where("created_by = ?", c.Query("createdBy"))
	}
	if c.Query("lastModifiedBy") != "" {
		query = query.Where("last_modified_by = ?", c.Query("lastModifiedBy"))
	}

	const timeFormat = "2006-01-02 15:04:05"

	query = query.Where("start_at BETWEEN ? AND ?",
		c.DefaultQuery("startUpper", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)),
		c.DefaultQuery("startLower", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)))

	query = query.Where("end_at BETWEEN ? AND ?",
		c.DefaultQuery("endUpper", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)),
		c.DefaultQuery("endLower", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)))

	query = query.Where("last_modified_at BETWEEN ? AND ?",
		c.DefaultQuery("lastModifiedStart", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)),
		c.DefaultQuery("lastModifiedEnd", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)))
	query = query.Where("created_at BETWEEN ? AND ?",
		c.DefaultQuery("createdStart", time.Date(2000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)),
		c.DefaultQuery("createdEnd", time.Date(3000, time.March, 14, 10, 30, 0, 0, time.UTC).Format(timeFormat)))

	var count int64
	if err := query.Count(&count).Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	offset := utils.GetOffset(page, &perpage)
	totalPage := utils.GetTotalPage(float32(count), &perpage)

	var obj []entity.Schedule
	result := query.Offset(offset).Limit(perpage).Find(&obj)
	if result.Error != nil {
		log.Error(result.Error.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}
	var response []payload.ScheduleResponse
	for _, auditorium := range obj {
		var temp payload.ScheduleResponse
		payload.MapStruct(auditorium, &temp)
		response = append(response, temp)
	}
	//

	c.JSON(http.StatusOK, payload.PaginationResponse[payload.ScheduleResponse]{
		Page:        page,
		Perpage:     perpage,
		Data:        response,
		TotalRecord: count,
		TotalPage:   int64(totalPage),
	})
}
