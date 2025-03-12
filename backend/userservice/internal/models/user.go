package models

import (
	"errors"
	"regexp"
)

type UsetStatus string

const (
	ACTIVE     = "ACTIVE"
	INACTIVE   = "INACTIVE"
	TERMINATED = "TERMINATED"
)

type User struct {
	UserID         uint   `json:"userId" gorm:"primaryKey;autoIncremented;<-:false"`
	Username       string `json:"username" gorm:"column:username;size:255;not null"`
	Password       string `json:"password" gorm:"size:255;not null"`
	Status         string `json:"status" gorm:"not null"`
	FirstName      string `json:"firstName" gorm:"size:255"`
	LastName       string `json:"lastName" gorm:"size:255"`
	DateOfBirth    string `json:"dateOfBirth"`
	PhoneNumber    string `json:"phoneNumber" gorm:"size:13"`
	Email          string `json:"email" gorm:"size:255;not null"`
	Roles          Role   `json:"roleId" gorm:"foreignKey:role_id"`
	IsDeleted      bool   `json:"isDeleted"`
	CreatedBy      string `json:"createdBy"`
	LastModifiedBy string `json:"lastModifiedBy"`
	CreatedAt      string `json:"createdAt"`
	LastModifiedAt string `json:"lastModifiedAt"`
}

/*
type Profile struct {
	ent.Schema
}

func (Profile) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("uuid", uuid.UUID{}).
			Default(uuid.New()),
		field.String("first_name").
			Optional(),
		field.String("last_name").
			Optional(),
		field.String("phone_number").
			Optional(),
		field.Int("user_id").
			Positive(),
	}
}
*/

type UserRequest struct {
	Username    string `json:"username" binding:"required"`
	Email       string `json:"email" binding:"required,email"`
	Status      string `json:"status" binding:"required"`
	Password    string `json:"password" binding:"required,min=6"`
	RoleID      uint   `json:"roleId" binding:"required"`
	FirstName   string `json:"firstName" binding:"required"`
	LastName    string `json:"lastName" binding:"required"`
	DateOfBirth string `json:"dateOfBirth"`
	PhoneNumber string `json:"phoneNumber"`
}

type UpdateUserRequest struct {
	UserID		uint   `json:"userId" binding:"required"`
	Email       string `json:"email" binding:"email"`
	Status      string `json:"status"`
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	DateOfBirth string `json:"dateOfBirth"`
	PhoneNumber string `json:"phoneNumber"`
	IsDeleted   bool   `json:"isDeleted"`
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
