package helper

import (
	"booking-service/common"
	"booking-service/modules/booking/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type GetMyBookingInput struct {
	Id int `json:"id"`
}

func WriteGetMyBookingInput(c *gin.Context) (*GetMyBookingInput, error) {
	idString := c.Param("id")

	id, err := strconv.Atoi(idString)
	if err != nil {
		return nil, common.ErrInValidRequest(err)
	}

	return &GetMyBookingInput{
		Id: id,
	}, nil
}

type GetMyBookingOutput struct {
	Data []models.Booking
}

func WriteGetRestaurantByIdOutput(c *gin.Context, result *GetMyBookingOutput) {
	c.JSON(http.StatusOK, common.SimpleSuccessResponse(result.Data))
}
