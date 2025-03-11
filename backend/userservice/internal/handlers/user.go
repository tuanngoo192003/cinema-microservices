package handlers

import (
	"net/http"
	"strconv"
	"user-service/internal/config"
	"user-service/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/tuanngoo192003/golang-utils/utils"
)

func (h *AuthHandler) GetAllUsers(c *gin.Context) {
	log := config.GetLogger()

	var users []models.User
	search := c.Query("search")
	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page <= 0 {
		page = utils.DEFAULT_PAGE
	}
	perpage, err := strconv.Atoi(c.Query("perpage"))
	if err != nil || page <= 0 {
		perpage = utils.DEFAULT_PAGE
	}

	dbQuery := h.db.GORM.Model(models.User{})
	if search == "" {
		dbQuery.Where(`
			to_tsvector('english', username || ' ' || email) @@ plainto_tsquery('english', CAST( ? AS TEXT))
			`, search)
	}

	var count int64
	err = dbQuery.Count(&count).Error
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	offset := utils.GetOffset(page, &perpage)
	totalPage := utils.GetTotalPage(float32(count), &perpage)
	err = dbQuery.Offset(offset).Limit(perpage).Find(&users).Error
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return 
	}

	c.JSON(http.StatusOK, models.PaginationResponse[models.User]{
		Page: page,
		Perpage: perpage, 
		Data: users,
		TotalRecord: count,
		TotalPage: int64(totalPage),
	})
}
