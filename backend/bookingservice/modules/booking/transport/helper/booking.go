package helper

import (
	"booking-service/common"
	"booking-service/modules/booking/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type BookingCreateInput struct {
	Data *models.BookingCreate
}

func GetBookingCreateInput(c *gin.Context) (*BookingCreateInput, error) {
	var data models.BookingCreate

	if err := c.ShouldBindJSON(&data); err != nil {
		panic(common.ErrInValidRequest(err))
	}

	return &BookingCreateInput{
		Data: &data,
	}, nil
}

type BookingCreateOutput struct {
	Id string `json:"id"`
}

func WriteBookingCreateOutput(c *gin.Context, output *BookingCreateOutput) {
	c.JSON(http.StatusOK, common.SimpleSuccessResponse(output.Id))
}
