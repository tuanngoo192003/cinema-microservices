package storage

import (
	"go.mongodb.org/mongo-driver/mongo"
)

type dbStore struct {
	collection *mongo.Collection
}

func NewDbStore(client *mongo.Client) *dbStore {
	return &dbStore{
		collection: client.Database("booking_service").Collection("bookings"),
	}
}