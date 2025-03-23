package router

import (
	"cinema-service/internal/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupMovieRouter(db *gorm.DB, router *gin.RouterGroup) {
	movieGroup := router.Group("/movies")
	aHandler := handlers.NewMoviesHandler(db)
	movieGroup.GET("/search", aHandler.Search)
	movieGroup.POST("/create", aHandler.CreateMovie)
	movieGroup.PUT("/update", aHandler.UpdateMovie)
}
