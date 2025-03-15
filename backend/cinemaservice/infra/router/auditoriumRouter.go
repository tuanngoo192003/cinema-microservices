package router

import (
	"cinema-service/internal/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupAuthoriumRouter(db *gorm.DB, router *gin.RouterGroup) {
	auditoriumGroup := router.Group("/auditoriums")
	aHandler := handlers.NewAuditoriumHandler(db)
	auditoriumGroup.GET("/search", aHandler.Search)
	auditoriumGroup.POST("/create", aHandler.Create)
	auditoriumGroup.PUT("/update", aHandler.Update)

}
