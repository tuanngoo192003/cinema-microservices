package transport

import (
	"booking-service/common"
	"booking-service/components/appctx"
	"booking-service/modules/booking/biz"
	"booking-service/modules/booking/repositories"
	"booking-service/modules/booking/storage"
	"booking-service/modules/booking/transport/helper"

	"github.com/gin-gonic/gin"
)

func HanleCreateBookingRequest(appContext appctx.AppContext) gin.HandlerFunc {
	client := appContext.GetMainDbConnection()
	storage := storage.NewDbStore(client)
	repository := repositories.NewBookingCreateRepository(storage)
	biz := biz.NewBookingCreateBiz(repository)

	return common.InvokeUseCase(
		helper.GetBookingCreateInput,
		biz.Invoke,
		helper.WriteBookingCreateOutput,
	)
}