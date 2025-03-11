package models

import (
	"errors"
	"regexp"
)

type User struct {
	UserID         uint   `json:"userId" gorm:"primaryKey;autoIncremented;<-:false"`
	Username       string `json:"username" gorm:"column:username;size:255;not null"`
	Password       string `json:"password" gorm:"size:255;not null"`
	Email          string `json:"email" gorm:"size:255;not null"`
	Roles          Role   `json:"roleId" gorm:"foreignKey:role_id"`
	IsDeleted      bool   `json:"isDeleted"`
	CreatedBy      string `json:"createdBy"`
	LastModifiedBy string `json:"lastModifiedBy"`
	CreatedAt      string `json:"createdAt"`
	LastModifiedAt string `json:"lastModifiedAt"`
}

type UserRequest struct {
	Username     string `json:"username" binding:"required"`
	Email        string `json:"email" binding:"required,email"`
	Password     string `json:"password" binding:"required,min=6"`
	RoleID       uint   `json:"roleId" binding:"required"`
	FirstName    string `json:"firstName" binding:"required"`
	LastName     string `json:"lastName" binding:"required"`
	DateOfBirth  string `json:"dateOfBirth"`
	PositionID   uint   `json:"positionId"`
	DepartmentID uint   `json:"departmentId"`
}

type UpdateUserRequest struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	RoleID   uint   `json:"roleId" binding:"required"`
}

type LoginRequest struct {
	Identifier string `json:"identifier" binding:"required"`
	Password   string `json:"password" binding:"required,min=6"`
}

func (u *UserRequest) Validate() error {
	emailRegex := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`)
	if !emailRegex.MatchString(u.Email) {
		return errors.New("invalid email format")
	}
	return nil
}
