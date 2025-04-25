package repositories

import (
	"booking-service/modules/booking/models"
	"context"
)

type IGetMyBookingStorage interface {
	GetBookingByUserId(ctx context.Context, userId int) ([]models.Booking, error)
}

type getMyBookingRepository struct {
	storage IGetMyBookingStorage
}

func NewGetMyBookingRepository(storage IGetMyBookingStorage) *getMyBookingRepository {
	return &getMyBookingRepository{
		storage: storage,
	}
}

func (repository *getMyBookingRepository) GetMyBooking(
	ctx context.Context,
	userId int,
) ([]models.Booking, error) {
	data, err := repository.storage.GetBookingByUserId(ctx, userId)
	if err != nil {
		return nil, err
	}

	return data, nil
}