package clients

import (
	"booking-service/common"
	client_models "booking-service/modules/booking/clients/models"
	"context"
	"net/http"
	"time"
)

type validateBookingRequestClient struct{}

func NewValidateBookingRequestClient() *validateBookingRequestClient {
	return &validateBookingRequestClient{}
}

func (client *validateBookingRequestClient) ValidateBookingRequest(
	ctx context.Context,
	bookingRequest client_models.ValidateBookingRequest,
) (*client_models.ValidateBookingResponse, error) {
	httpRequest := common.APIRequest{
		Method: http.MethodPost,
		URL:    common.HTTP_CLIENT_MOVIE_BASE_URL + "/api/validate/booking_request",
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body:    bookingRequest,
		Timeout: 10 * time.Second,
	}

	data, err := common.SendRequest[client_models.ValidateBookingResponse](ctx, httpRequest)
	if err != nil {
		return nil, common.ErrClientSendRequest(httpRequest.URL, httpRequest.Method, err)
	}

	return data, nil
}
