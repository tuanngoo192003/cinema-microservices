package router

import (
	"user-service/infra/config"
	"user-service/internal/handlers"

	"github.com/gin-gonic/gin"
)

func UploadApis(authHandler *handlers.AuthHandler, r *gin.Engine, cfg *config.Config) {
	protected := r.Group("/upload")
	{
		protected.POST("", authHandler.UploadFile)
	}
}
