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
	ID                  primitive.ObjectID `bson:"_id,omitempty"`
	UserID              int                `bson:"user_id"`
	ScheduleID          int                `bson:"schedule_id"`
	SeatIDs             []int              `bson:"seat_ids"`
	TotalPrice          float64            `bson:"total_price"`
	Status              string             `bson:"status"` // PENDING, CONFIRMED, CANCELED
	CreatedAt           time.Time          `bson:"created_at"`
	UpdatedAt           time.Time          `bson:"updated_at"`
	UpdatedBy           int                `bson:"updated_by"`
}
