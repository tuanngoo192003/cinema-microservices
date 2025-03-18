package router

import (
	"user-service/infra/client"
	"user-service/infra/config"
	"user-service/internal/handlers"

	"github.com/gin-gonic/gin"
)

func UserApis(authHandler *handlers.AuthHandler, r *gin.Engine, cfg *config.Config) {
	protected := r.Group("/users")
	{
		protected.GET("/:id", authHandler.GetUserById)
		protected.GET("", authHandler.GetAllUsers)
		protected.POST("", authHandler.CreateUser)
		protected.PUT("", authHandler.UpdateUser)	
		protected.GET("existed/:id", authHandler.IsUserExist)	
		protected.GET("userservice/cinema/health", client.CinemaServiceHealthCheck)
	}
}

