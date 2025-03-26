package appctx

import (
	"go.mongodb.org/mongo-driver/mongo"
)

type AppContext interface {
	GetMainDbConnection() *mongo.Client
}

type appCtx struct {
	client *mongo.Client;
}

func NewAppContext(client *mongo.Client) *appCtx {
	return &appCtx{client}
}

func (ctx *appCtx) GetMainDbConnection() *mongo.Client {
	return ctx.client
}
