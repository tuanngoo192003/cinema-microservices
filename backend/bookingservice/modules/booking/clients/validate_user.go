package clients

import (
	"booking-service/common"
	client_models "booking-service/modules/booking/clients/models"
	"context"
	"net/http"
	"time"
)

type validateUserClient struct{}

func NewValidateUserClient() *validateUserClient {
	return &validateUserClient{}
}

func (client *validateUserClient) ValidateUserById(
	ctx context.Context,
	id int,
) (*client_models.ValidateUserResponse, error) {
	httpRequest := common.APIRequest{
		Method: http.MethodGet,
		URL:    common.HTTP_CLIENT_USER_BASE_URL + "/api/user/booking_request",
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Timeout: 10 * time.Second,
	}

	data, err := common.SendRequest[client_models.ValidateUserResponse](ctx, httpRequest)
	if err != nil {
		return nil, common.ErrClientSendRequest(httpRequest.URL, httpRequest.Method, err)
	}

	return data, nil
}
