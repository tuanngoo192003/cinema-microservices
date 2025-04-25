package router

import (
	"cinema-service/internal/handlers"
	"cinema-service/internal/repo"
	"cinema-service/internal/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupReservedSeatRouter(db *gorm.DB, router *gin.RouterGroup) {
	reservedSeatsGroup := router.Group("/seats/reservations")
	rHandler := handlers.NewReservedSeatHandler(usecase.NewReservedSeatUsecase(repo.NewReservedSeatRepo(db)))

	reservedSeatsGroup.GET("", rHandler.Search)
	reservedSeatsGroup.POST("", rHandler.Create)
	reservedSeatsGroup.DELETE("/:id", rHandler.Remove)
}
