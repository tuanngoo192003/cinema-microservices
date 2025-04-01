package biz

import (
	"booking-service/common"
	client_models "booking-service/modules/booking/clients/models"
	"booking-service/modules/booking/models"
	"booking-service/modules/booking/transport/helper"
	"context"
	"time"
)

type IBookingCreateRepository interface {
	Create(ctx context.Context, booking *models.Booking) (string, error)
}

type IValidateBookingRequestRepository interface {
	ValidateBookingRequest(
		ctx context.Context,
		bookingRequest client_models.ValidateBookingRequest,
	) (*client_models.ValidateBookingResponse, error)
}

type IValidateUserRepository interface {
	ValidateUserById(
		ctx context.Context,
		id int,
	) (bool, error)
}

type bookingRepositories struct {
	bookingCreateRepository          IBookingCreateRepository
	validateBookingRequestRepository IValidateBookingRequestRepository
	validateUserRepository           IValidateUserRepository
}

type bookingCreateBiz struct {
	repositories *bookingRepositories
}

func NewBookingCreateBiz(
	bookingCreateRepository IBookingCreateRepository,
	validateBookingRequestRepository IValidateBookingRequestRepository,
	validateUserRepository IValidateUserRepository,
) *bookingCreateBiz {
	return &bookingCreateBiz{
		repositories: &bookingRepositories{
			bookingCreateRepository:          bookingCreateRepository,
			validateBookingRequestRepository: validateBookingRequestRepository,
			validateUserRepository:           validateUserRepository,
		},
	}
}

func (biz *bookingCreateBiz) Invoke(
	ctx context.Context,
	input *helper.BookingCreateInput,
) (*helper.BookingCreateOutput, error) {

	userID := 1

	// isValid, err := biz.repositories.validateUserRepository.ValidateUserById(ctx, userID)
	// if err != nil {
	// 	return nil, err
	// }

	// if !isValid {
	// 	return nil, common.NewUnauthorized(nil, "Invalid userID", "Call user service, userID not valid", "UserNotValid")
	// }

	// validateBookingRequest := client_models.ValidateBookingRequest{
	// 	UserID:     userID,
	// 	ScheduleID: input.Data.ScheduleID,
	// 	SeatIDs:    input.Data.SeatIDs,
	// }

	// movie, err := biz.repositories.validateBookingRequestRepository.ValidateBookingRequest(ctx, validateBookingRequest)
	// if err != nil {
	// 	return nil, err
	// }

	now := time.Now()

	createData := models.Booking{
		UserID:     userID,
		ScheduleID: input.Data.ScheduleID,
		TotalPrice: 45,
		SeatIDs:    input.Data.SeatIDs,
		Status:     "Pending",
		CreatedAt:  now,
		UpdatedAt:  now,
		UpdatedBy:  1,
		Movie: client_models.Movie{
			MovieId:        1,                 // movie.Data.MovieId
			ReleaseDate:    now,               // movie.Data.ReleaseDate
			MovieName:      "Test movie name", // movie.Data.MovieName
			Price:          1111,              // movie.Data.Price
			StartAt:        "09.00",           // movie.Data.StartAt
			EndAt:          "11.00",           // movie.Data.EndAt
			MovieGenre:     "Test genre",      // movie.Data.MovieGenre
			Description:    "Test",            // movie.Data.Description
			ImageURL:       "link",            // movie.Data.ImageURL
			AuditoriumName: "P10",             // movie.Data.AuditoriumName
		},
	}

	id, err := biz.repositories.bookingCreateRepository.Create(ctx, &createData)
	if err != nil {
		return nil, common.ErrCannotCreateEntity(models.EntityName, err)
	}

	return &helper.BookingCreateOutput{
		Id: id,
	}, nil
}
