package router

import (
	"booking-service/components/appctx"

	"github.com/gin-gonic/gin"
)

func RegisterRouter(group *gin.RouterGroup, appContext appctx.AppContext) {
	booking := group.Group("/booking")

	booking.POST("")
}