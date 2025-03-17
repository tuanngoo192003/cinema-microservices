package router

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(db *gorm.DB, g *gin.Engine) {
	group := g.Group("/cinema-service")
	SetupAuthoriumRouter(db, group)
	SetupSeatRouter(db, group)
}
