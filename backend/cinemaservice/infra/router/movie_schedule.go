package router

import (
	"cinema-service/internal/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupMovieScheduleRouter(db *gorm.DB, router *gin.RouterGroup) {
	movieGroup := router.Group("/movie-schedules")
	h := handlers.NewMovieScheduleHandler(db)
	movieGroup.GET("", h.ListMovieSchedules)
	movieGroup.GET("/:id", h.GetMovieSchedule)
	movieGroup.GET("/details/:id", h.GetMovieScheduleDetails)
	movieGroup.POST("", h.CreateMovieSchedule)
	movieGroup.PUT("", h.UpdateMovieSchedule)
}
