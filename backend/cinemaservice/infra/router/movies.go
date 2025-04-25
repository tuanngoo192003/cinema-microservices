package router

import (
	"cinema-service/internal/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupMovieRouter(db *gorm.DB, router *gin.RouterGroup) {
	movieGroup := router.Group("/movies")
	h := handlers.NewMoviesHandler(db)
	movieGroup.GET("", h.ListMovies)
	movieGroup.GET("/:id", h.GetMovieByID)
	movieGroup.GET("/all", h.GetAllMovies)
	movieGroup.POST("", h.CreateMovie)
	movieGroup.PUT("", h.UpdateMovie)
}
