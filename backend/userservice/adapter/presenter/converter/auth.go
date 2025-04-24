package converter

import (
	"errors"
	"net/http"
	"user-service/infra/config"
	"user-service/usecase"

	"github.com/gin-gonic/gin"
)

func ToLoginInputType(c *gin.Context) (*usecase.LoginRequest, error) {
	log := config.GetLogger()

	var input usecase.LoginRequest

	err := c.ShouldBindJSON(&input)
	if err != nil {
		log.Error(err.Error())
		return &usecase.LoginRequest{}, err
	}
	return &input, nil
}

func ToRefreshTokenInputType(c *gin.Context) (*usecase.RefreshTokenRequest, error) {
	log := config.GetLogger()

	/* Get userId from context set by auth middleware */
	username, exists := c.Get("username")
	if !exists {
		log.Error("User not authenticated")
		return &usecase.RefreshTokenRequest{}, errors.New("user not authenticated")
	}

	var refreshToken usecase.RefreshTokenRequest
	if err := c.ShouldBindJSON(&refreshToken); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": err.Error()}})
		return &usecase.RefreshTokenRequest{}, err
	}

	uname, ok := username.(string)
	if !ok {
		return &usecase.RefreshTokenRequest{}, errors.New("username is not a string")
	}

	return &usecase.RefreshTokenRequest{
		Username: uname,
	}, nil
}
