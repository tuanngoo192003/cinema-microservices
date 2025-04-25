package biz

import (
	"booking-service/common"
	"booking-service/modules/booking/models"
	"booking-service/modules/booking/transport/helper"
	"context"
)

type IGetMyBookingRepository interface {
	GetMyBooking(ctx context.Context, userId int) ([]models.Booking, error)
}

type getMyBookingBiz struct {
	repository IGetMyBookingRepository
}

func NewGetMyBookingBiz(storage IGetMyBookingRepository) *getMyBookingBiz {
	return &getMyBookingBiz{storage}
}

func (biz *getMyBookingBiz) Invoke (
	ctx context.Context,
	input *helper.GetMyBookingInput,
) (*helper.GetMyBookingOutput, error) {
	data, err := biz.repository.GetMyBooking(ctx, input.Id)
	if err != nil {
		return nil, common.ErrCannotListEntity(models.EntityName, err)
	}

	return &helper.GetMyBookingOutput{
		Data: data,
	}, nil
}