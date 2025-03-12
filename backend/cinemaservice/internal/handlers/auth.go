package handlers

import (
	"cinema-service/internal/database"
	"time"
)

type AuthHandler struct {
	db              *database.Database
	jwtSecret       []byte
	tokenExpiration time.Duration
}

func NewAuthHandler(db *database.Database, jwtSecret string) *AuthHandler {
	return &AuthHandler{
		db:              db,
		jwtSecret:       []byte(jwtSecret),
		tokenExpiration: time.Hour * 24,
	}
}

func (h *AuthHandler) GetDB() *database.Database {
	return h.db
}
