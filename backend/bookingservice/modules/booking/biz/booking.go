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
	SetSeatStatusRequest(
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

	// isValid, err := biz.repositories.validateUserRepository.ValidateUserById(ctx, userID)
	// if err != nil {
	// 	return nil, err
	// }

	// if !isValid {
	// 	return nil, common.NewUnauthorized(nil, "Invalid userID", "Call user service, userID not valid", "UserNotValid")
	// }

	validateBookingRequest := client_models.ValidateBookingRequest{
		UserID:     input.Data.UserID,
		ScheduleID: input.Data.ScheduleID,
		SeatIDs:    toSeatIDs(input.Data.Seats),
		Token:      input.Token,
	}

	_, err := biz.repositories.validateBookingRequestRepository.SetSeatStatusRequest(ctx, validateBookingRequest)
	if err != nil {
		return nil, err
	}

	now := time.Now()

	layout := "2006-01-02T15:04:05Z"

	t, err := time.Parse(layout, input.Data.ReleaseDate)
	if err != nil {
		return nil, err
	}

	createData := models.Booking{
		UserID:     input.Data.UserID,
		ScheduleID: input.Data.ScheduleID,
		TotalPrice: input.Data.TotalPrice,
		Seats:      toSeatsModel(input.Data.Seats),
		Status:     input.Data.Status,
		CreatedAt:  now,
		UpdatedAt:  now,
		UpdatedBy:  input.Data.UserID,
		Movie: client_models.Movie{
			MovieId:        input.Data.MovieID,
			ReleaseDate:    t,
			MovieName:      input.Data.MovieName,
			Price:          input.Data.MoviePrice,
			StartAt:        input.Data.StartAt,
			EndAt:          input.Data.EndAt,
			MovieGenre:     input.Data.MovieGenre,
			Description:    input.Data.Description,
			AuditoriumName: input.Data.AuditoriumName,
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

func toSeatsModel(seats []models.BookingSeatCreate) (seatModels []models.BookingSeats) {
	for _, v := range seats {
		seatModels = append(seatModels, models.BookingSeats(v))
	}
	return
}

func toSeatIDs(seats []models.BookingSeatCreate) (seatIds []int) {
	for _, v := range seats {
		seatIds = append(seatIds, v.SeatID)
	}
	return
}
