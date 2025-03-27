package router

import (
	"cinema-service/internal/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupReservedSeatRouter(db *gorm.DB, router *gin.RouterGroup) {
	reservedSeatsGroup := router.Group("/reservedSeats")
	rHandler := handlers.NewReservedSeatHandler(db)
	reservedSeatsGroup.GET("", rHandler.Search)
	reservedSeatsGroup.POST("", rHandler.Create)
}
