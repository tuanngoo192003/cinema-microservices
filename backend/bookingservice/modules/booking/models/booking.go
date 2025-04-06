package models

import (
	client_models "booking-service/modules/booking/clients/models"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	EntityName = "Booking Requests"
	ParamID    = "ID"
)

type Booking struct {
	client_models.Movie `bson:",inline"`
	ID                  primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	UserID              int                `json:"userId" bson:"user_id"`
	ScheduleID          int                `json:"scheduleId" bson:"schedule_id"`
	Seats               []BookingSeats     `json:"seats" bson:"seats"`
	TotalPrice          float64            `json:"totalPrice" bson:"total_price"`
	Status              string             `json:"status" bson:"status"` // PENDING, CONFIRMED, CANCELED
	CreatedAt           time.Time          `json:"created_at" bson:"created_at"`
	UpdatedAt           time.Time          `json:"updated_at" bson:"updated_at"`
	UpdatedBy           int                `json:"updated_by" bson:"updated_by"`
}

type BookingSeats struct {
	SeatID   int    `json:"seatId" bson:"seat_id"`
	SeatCode string `json:"seatCode" bson:"seat_code"`
}
