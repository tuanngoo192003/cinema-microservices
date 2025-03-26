package models

import "go.mongodb.org/mongo-driver/bson/primitive"

const (
	EntityName = "Booking Requests"
	ParamID    = "ID"
)

type Booking struct {
	ID         primitive.ObjectID `bson:"_id,omitempty"`
	UserID     int                `bson:"user_id"`
	ScheduleID int                `bson:"schedule_id"`
	SeatIDs    []int              `bson:"seat_ids"`
	TotalPrice float64            `bson:"total_price"`
	Status     string             `bson:"status"` // PENDING, CONFIRMED, CANCELED
	CreatedAt  primitive.DateTime `bson:"created_at"`
	UpdatedAt  primitive.DateTime `bson:"updated_at"`
	UpdatedBy  int 			  	  `bson:"updated_by"`
}