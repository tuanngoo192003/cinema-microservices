package transport

import (
	"booking-service/common"
	"booking-service/components/appctx"
	"booking-service/modules/booking/biz"
	"booking-service/modules/booking/clients"
	"booking-service/modules/booking/repositories"
	"booking-service/modules/booking/storage"
	"booking-service/modules/booking/transport/helper"

	"github.com/gin-gonic/gin"
)

func HandleCreateBookingRequest(appContext appctx.AppContext) gin.HandlerFunc {
	client := appContext.GetMainDbConnection()
	storage := storage.NewDbStore(client)
	validateBookingRequestClient := clients.NewValidateBookingRequestClient()
	validateUserClient := clients.NewValidateUserClient()
	bookingCreateRepository := repositories.NewBookingCreateRepository(storage)
	validateBookingRequestRepository := repositories.NewValidateBookingRequestRepository(validateBookingRequestClient)
	validateUserRepository := repositories.NewValidateUserRepository(validateUserClient)
	biz := biz.NewBookingCreateBiz(bookingCreateRepository, validateBookingRequestRepository, validateUserRepository)

	return common.InvokeUseCase(
		helper.GetBookingCreateInput,
		biz.Invoke,
		helper.WriteBookingCreateOutput,
	)
}
