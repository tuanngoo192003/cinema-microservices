package main

import (
	"booking-service/components/appctx"
	"booking-service/infrastructure/config"
	"booking-service/infrastructure/database"
	"booking-service/middleware"
	"booking-service/modules/booking/router"
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {

	cfg, err := config.Load()

	log := config.Newlogger(config.ConfigLogger{})

	if err != nil {
		log.Fatal("Failed to load config: ", err)
	}

	connectionString := "mongodb+srv://dinhson1032001:BbRMG8pePswTpbUd@dihson103.pckvrmm.mongodb.net/?retryWrites=true&w=majority&appName=dihson103"
	// connectionString := "mongodb://bookingdb:27017/bookingservicedb"
	client, err := database.GetMongoDbClient(connectionString)
	if err != nil {
		log.Fatal("❌ Error:", err)
	}
	defer client.Disconnect(context.Background())

	appContext := appctx.NewAppContext(client)

	//Set gin mode
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	/* Initialize router with middleware */
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(gin.Logger())

	r.Use(middleware.Recover(appContext))

	v1 := r.Group("/api/v1")

	router.RegisterRouter(v1, appContext)

	sererAddr := cfg.Server.Host + ":" + cfg.Server.Port
	log.Infof("BookingService started on %s and listening...", sererAddr)

	srv := &http.Server{
		Addr:         sererAddr,
		Handler:      r,
		ReadTimeout:  cfg.Server.ReadTimeout,
		WriteTimeout: cfg.Server.WriteTimeout,
	}
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal("Server failed to start: ", err)
	}
}
