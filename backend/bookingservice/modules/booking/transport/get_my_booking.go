package transport

import (
	"booking-service/common"
	"booking-service/components/appctx"
	"booking-service/modules/booking/biz"
	"booking-service/modules/booking/storage"
	"booking-service/modules/booking/transport/helper"

	"github.com/gin-gonic/gin"
)

func HandleGetMyBooking(appContext appctx.AppContext) gin.HandlerFunc {
	client := appContext.GetMainDbConnection()
	storage := storage.NewDbStore(client)
	biz := biz.NewGetMyBookingBiz(storage)

	return common.InvokeUseCase(
		helper.WriteGetMyBookingInput,
		biz.Invoke,
		helper.WriteGetRestaurantByIdOutput,
	)
}