package storage

import (
	"booking-service/modules/booking/models"
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
)

func (db *dbStore) GetBookingByUserId(ctx context.Context, userId int) ([]models.Booking, error) {
	var data []models.Booking

	cursor, err := db.collection.Find(ctx, bson.M{"user_id": userId})
	if err != nil {
		log.Println("Error fetching bookings:", err)
		return nil, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var booking models.Booking
		if err := cursor.Decode(&booking); err != nil {
			log.Println("Error decoding booking:", err)
			return nil, err
		}
		data = append(data, booking)
	}

	if err := cursor.Err(); err != nil {
		log.Println("Cursor error:", err)
		return nil, err
	}

	return data, nil
}
