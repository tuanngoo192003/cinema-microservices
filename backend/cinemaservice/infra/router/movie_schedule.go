package router

import (
	"cinema-service/internal/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupMovieScheduleRouter(db *gorm.DB, router *gin.RouterGroup) {
	movieGroup := router.Group("/movies")
	aHandler := handlers.NewMovieScheduleHandler(db)
	movieGroup.GET("", aHandler.ListMovieSchedules)
	movieGroup.GET("/:id", aHandler.GetMovieSchedule)
	movieGroup.POST("", aHandler.CreateMovieSchedule)
	movieGroup.PUT("", aHandler.UpdateMovieSchedule)
}
