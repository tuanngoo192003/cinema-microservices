package router

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(db *gorm.DB, g *gin.Engine) {
	group := g.Group("")
	SetupAuthoriumRouter(db, group)
	SetupSeatRouter(db, group)
	SetupMovieRouter(db, group)
	SetupMovieScheduleRouter(db, group)
	SetupReservedSeatRouter(db, group)
}
