package handlers

import (
	"time"

	"gorm.io/gorm"
)

type AuthHandler struct {
	db              *gorm.DB
	jwtSecret       []byte
	tokenExpiration time.Duration
}

func NewAuthHandler(db *gorm.DB, jwtSecret string) *AuthHandler {
	return &AuthHandler{
		db:              db,
		jwtSecret:       []byte(jwtSecret),
		tokenExpiration: time.Hour * 24,
	}
}

func (h *AuthHandler) GetDB() *gorm.DB {
	return h.db
}
