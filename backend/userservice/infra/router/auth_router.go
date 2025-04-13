package router

import (
	"user-service/infra/config"
	"user-service/internal/handlers"
	"user-service/internal/middleware"

	"github.com/gin-gonic/gin"
)

func AuthApis(authHandler *handlers.AuthHandler, r *gin.Engine, cfg *config.Config) {
	protected := r.Group("/")
	{
		protected.POST("refresh", middleware.ContextMiddleware([]byte(cfg.JWT.Secret)), authHandler.RefreshToken)	
		protected.POST("login", authHandler.Login)
	}
}
