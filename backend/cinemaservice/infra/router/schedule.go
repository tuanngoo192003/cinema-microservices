package router

import (
	"cinema-service/internal/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupScheduleRouter(db *gorm.DB, router *gin.RouterGroup) {
	scheduleGroup := router.Group("/schedule")
	sHandler := handlers.NewScheduleHandler(db)
	scheduleGroup.GET("", sHandler.Search)
	scheduleGroup.POST("", sHandler.Create)
	scheduleGroup.PUT("/:id", sHandler.Update)
	scheduleGroup.DELETE("", sHandler.Delete)

}
