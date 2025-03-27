package router

import (
	"cinema-service/internal/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupAuditoriumRouter(db *gorm.DB, router *gin.RouterGroup) {
	auditoriumGroup := router.Group("/auditoriums")
	aHandler := handlers.NewAuditoriumHandler(db)
	auditoriumGroup.GET("", aHandler.Search)
	auditoriumGroup.POST("", aHandler.Create)
	auditoriumGroup.PUT("", aHandler.Update)

}
