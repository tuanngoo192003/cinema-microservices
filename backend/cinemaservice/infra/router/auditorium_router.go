package router

import (
	"cinema-service/internal/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupAuthoriumRouter(db *gorm.DB, router *gin.RouterGroup) {
	auditoriumGroup := router.Group("/auditoriums")
	h := handlers.NewAuditoriumHandler(db)
	auditoriumGroup.GET("", h.ListAuditoriums)
	auditoriumGroup.GET("/:id", h.GetAuditoriumByID)
	auditoriumGroup.GET("/all", h.GetAllAuditoriums)
	auditoriumGroup.POST("", h.Create)
	auditoriumGroup.PUT("", h.Update)
}
