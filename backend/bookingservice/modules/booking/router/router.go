package router

import (
	"booking-service/components/appctx"
	"booking-service/modules/booking/transport"

	"github.com/gin-gonic/gin"
)

func RegisterRouter(group *gin.RouterGroup, appContext appctx.AppContext) {
	booking := group.Group("/booking")

	booking.POST("", transport.HanleCreateBookingRequest(appContext))
	booking.GET("/:id", transport.HandleGetMyBooking(appContext))
}
