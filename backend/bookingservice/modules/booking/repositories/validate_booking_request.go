package repositories

import (
	client_models "booking-service/modules/booking/clients/models"
	"context"
)

type IValidateBookingRequestClient interface {
	ValidateBookingRequest(ctx context.Context, bookingRequest client_models.ValidateBookingRequest) (*client_models.ValidateBookingResponse, error)
}

type validateBookingRequestRepository struct {
	client IValidateBookingRequestClient
}

func NewValidateBookingRequestRepository(client IValidateBookingRequestClient) *validateBookingRequestRepository {
	return &validateBookingRequestRepository{
		client: client,
	}
}

func (repo *validateBookingRequestRepository) ValidateBookingRequest(
	ctx context.Context,
	bookingRequest client_models.ValidateBookingRequest,
) (*client_models.ValidateBookingResponse, error) {
	movie, err := repo.client.ValidateBookingRequest(ctx, bookingRequest)

	if err != nil {
		return nil, err
	}

	return movie, nil
}
