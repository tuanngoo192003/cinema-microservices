package storage

import (
	"booking-service/common"
	"booking-service/modules/booking/models"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (db *dbStore) CreateBooking(ctx context.Context, booking *models.Booking) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := db.collection.InsertOne(ctx, booking)
	if err != nil {
		return "", common.ErrDb(err)
	}

	insertedID, ok := result.InsertedID.(primitive.ObjectID)
	if !ok {
		return "", common.FailedToConvertID
	}
	
	return insertedID.Hex(), nil
}