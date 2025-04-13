package handlers

import (
	"net/http"
	"strconv"
	"user-service/infra/config"
	"user-service/internal/constants"
	"user-service/internal/domain/entity"
	"user-service/internal/handlers/payload"

	"github.com/gin-gonic/gin"
	"github.com/tuanngoo192003/golang-utils/utils"
)

func (h *AuthHandler) GetAllUsers(c *gin.Context) {
	log := config.GetLogger()

	var users []payload.UserResponse
	search := c.Query("search")
	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page <= 0 {
		page = utils.DEFAULT_PAGE
	}
	perpage, err := strconv.Atoi(c.Query("perpage"))
	if err != nil || page <= 0 {
		perpage = utils.DEFAULT_PAGE
	}

	dbQuery := h.db.GORM.Model(entity.User{})
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
	err = dbQuery.Model(&entity.User{}).
		Select(`users.user_id, users.email, users.status, users.first_name, users.last_name, 
				users.date_of_birth, users.phone_number, users.avatar, roles.role_name`).
		Joins("left join roles on roles.role_id = users.role_id").
		Offset(offset).
		Limit(perpage).
		Find(&users).Error
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, payload.PaginationResponse[payload.UserResponse]{
		Page:        page,
		Perpage:     perpage,
		Data:        users,
		TotalRecord: count,
		TotalPage:   int64(totalPage),
	})
}

func (h *AuthHandler) GetUserById(c *gin.Context) {
	log := config.GetLogger()

	var user entity.User
	if err := h.db.GORM.Where(`user_id = ? `, c.Param("id")).Preload("Roles").Find(&user).Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":          user.UserID,
		"firstName":   user.FirstName,
		"lastName":    user.LastName,
		"email":       user.Email,
		"dateOfBirth": user.DateOfBirth,
		"phoneNumber": user.PhoneNumber,
		"role":        user.Roles.RoleName,
		"avatar":      user.Avatar,
	})
}

func (h *AuthHandler) UpdateUser(c *gin.Context) {
	log := config.GetLogger()

	var user payload.UpdateUserRequest
	if err := c.ShouldBindJSON(&user); err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tx, err := h.db.DB.Begin()
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
		return
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			log.Error("Transaction failed")
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction failed"})
		}
	}()
	var userUpdate entity.User

	if user.Avatar != "" {
		userUpdate.Avatar = user.Avatar
	}
	if user.Email != "" {
		userUpdate.Email = user.Email
	}
	if user.Status != "" {
		userUpdate.Status = user.Status
	}
	if user.FirstName != "" {
		userUpdate.FirstName = user.FirstName
	}
	if user.LastName != "" {
		userUpdate.LastName = user.LastName
	}
	if user.PhoneNumber != "" {
		userUpdate.PhoneNumber = user.PhoneNumber
	}
	if user.DateOfBirth != "" {
		userUpdate.DateOfBirth = user.DateOfBirth
	}
	if user.IsDeleted {
		userUpdate.IsDeleted = user.IsDeleted
	}

	if err := h.db.GORM.Model(entity.User{}).Where(`user_id = ?`, user.UserID).Updates(&userUpdate).Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := tx.Commit(); err != nil {
		log.Error("Failed to commit transaction")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, constants.USER_UPDATED_SUCCESSFULLY)
}

func (h *AuthHandler) CreateUser(c *gin.Context) {
	log := config.GetLogger()

	var user payload.UserRequest
	if err := c.ShouldBindJSON(&user); err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tx, err := h.db.DB.Begin()
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
		return
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			log.Error("Transaction failed")
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction failed"})
		}
	}()
	var id int64
	passwordHashed, err := utils.HashPassword(user.Password)
	if err != nil {
		tx.Rollback()
		log.Error("Password hashing failed")
		c.JSON(http.StatusInternalServerError, "Password hashing failed")
		return
	}

	if err := tx.QueryRow(`
		INSERT INTO users(username, password, status, email, first_name, last_name, date_of_birth, phone_number, role_id)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING user_id	
		`, user.Username, passwordHashed, user.Status, user.Email, user.FirstName, user.LastName, user.DateOfBirth, user.PhoneNumber, user.RoleID).
		Scan(&id); err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := tx.Commit(); err != nil {
		log.Error("Failed to commit transaction")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, constants.USER_CREATED_SUCCESSFULLY)
}

func (h *AuthHandler) IsUserExist(c *gin.Context) {
	log := config.GetLogger()

	var username string
	if err := h.db.GORM.
		Model(entity.User{}).Select("username").Where("user_id = ?", c.Param("id")).First(&username).Error; err != nil {
		log.Info(err.Error())
		c.JSON(http.StatusOK, gin.H{"existed": false})
		return
	}
	if username != "" {
		c.JSON(http.StatusOK, gin.H{"existed": true})
	} else {
		c.JSON(http.StatusOK, gin.H{"existed": false})
	}
}
