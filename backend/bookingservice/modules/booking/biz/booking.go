package biz

import (
	"booking-service/common"
	"booking-service/modules/booking/models"
	"booking-service/modules/booking/transport/helper"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type IBookingCreateStorage interface {
	CreateBooking(ctx context.Context, booking *models.Booking) (string, error) 
}

type bookingCreateBiz struct {
	storage IBookingCreateStorage
}

func NewBookingCreateBiz(storage IBookingCreateStorage) *bookingCreateBiz {
	return &bookingCreateBiz{storage}
}

func (biz *bookingCreateBiz) Invoke(
	ctx context.Context,
	input *helper.BookingCreateInput,
) (*helper.BookingCreateOutput, error) {

	now := primitive.NewDateTimeFromTime(time.Now())

	createData := models.Booking {
		UserID: 1,
		ScheduleID: input.Data.ScheduleID,
		TotalPrice: 45,
		SeatIDs: []int{1, 2},
		Status: "Pending",
		CreatedAt: now,
		UpdatedAt: now,
		UpdatedBy: 1,
	}

	id, err := biz.storage.CreateBooking(ctx, &createData)
	if err != nil {
		return nil, common.ErrCannotCreateEntity(models.EntityName, err)
	}

	return &helper.BookingCreateOutput{
		Id: id,
	}, nil
}