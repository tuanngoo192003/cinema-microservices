package router

import (
	"cinema-service/internal/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupScheduleRouter(db *gorm.DB, router *gin.RouterGroup) {
	scheduleGroup := router.Group("/schedule")
	sHandler := handlers.NewScheduleHandler(db)
	scheduleGroup.GET("/search", sHandler.Search)
	scheduleGroup.POST("/create", sHandler.Create)
	scheduleGroup.PUT("/update", sHandler.Update)
	scheduleGroup.DELETE("/delete", sHandler.Delete)

}
