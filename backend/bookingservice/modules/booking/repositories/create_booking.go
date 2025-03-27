package repositories

import (
	"booking-service/modules/booking/models"
	"context"
)

type IBookingCreateStorage interface {
	CreateBooking(ctx context.Context, booking *models.Booking) (string, error)
}

type bookingCreateRepository struct {
	storage IBookingCreateStorage
}

func NewBookingCreateRepository(storage IBookingCreateStorage) *bookingCreateRepository {
	return &bookingCreateRepository{
		storage: storage,
	}
}

func (repo *bookingCreateRepository) Create(ctx context.Context, booking *models.Booking) (string, error) {
	id, err := repo.storage.CreateBooking(ctx, booking)
	if err != nil {
		return "", err
	}

	return id, nil
}