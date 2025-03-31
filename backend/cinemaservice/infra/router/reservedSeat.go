package router

import (
	"cinema-service/internal/handlers"
	"cinema-service/internal/repo"
	"cinema-service/internal/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupReservedSeatRouter(db *gorm.DB, router *gin.RouterGroup) {
	reservedSeatsGroup := router.Group("/reservedSeats")
	rRepo := repo.NewReservedSeatRepo(db)
	rUseCase := usecase.NewReservedSeatUsecase(rRepo)
	rHandler := handlers.NewReservedSeatHandler(rUseCase)
	reservedSeatsGroup.GET("", rHandler.Search)
	reservedSeatsGroup.POST("", rHandler.Create)
}
