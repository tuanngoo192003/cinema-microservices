package router

import (
	"cinema-service/internal/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupSeatRouter(db *gorm.DB, router *gin.RouterGroup) {
	seatGroup := router.Group("/seats")
	sHandler := handlers.NewSeatHandler(db)
	seatGroup.GET("", sHandler.Search)
	seatGroup.POST("", sHandler.Create)
	seatGroup.PUT("/:id", sHandler.Update)
}
