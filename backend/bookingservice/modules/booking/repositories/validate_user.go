package repositories

import (
	client_models "booking-service/modules/booking/clients/models"
	"context"
)

type IValidateUserClient interface {
	ValidateUserById(ctx context.Context, id int) (*client_models.ValidateUserResponse, error)
}

type validateUserRepository struct {
	client IValidateUserClient
}

func NewValidateUserRepository(client IValidateUserClient) *validateUserRepository {
	return &validateUserRepository{
		client: client,
	}
}

func (repo *validateUserRepository) ValidateUserById(
	ctx context.Context,
	id int,
) (bool, error) {
	_, err := repo.client.ValidateUserById(ctx, id)

	if err != nil {
		return false, err
	}

	return true, nil
}
