package router

import (
	"cinema-service/internal/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupMovieRouter(db *gorm.DB, router *gin.RouterGroup) {
	movieGroup := router.Group("/movies")
	aHandler := handlers.NewMoviesHandler(db)
	movieGroup.GET("", aHandler.ListMovies)
	movieGroup.POST("", aHandler.CreateMovie)
	movieGroup.PUT("", aHandler.UpdateMovie)
}
