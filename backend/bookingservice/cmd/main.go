package main

import (
	"booking-service/infrastructure/config"
	"booking-service/infrastructure/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	
	cfg, err := config.Load()

	log := config.Newlogger(config.ConfigLogger{})

	if err != nil {
		log.Fatal("Failed to load config: ", err)	 
    }


	db, err := database.NewDatabase(cfg.GetDSN())
    if err != nil {
        log.Fatal("Failed to connect to database", err)
    }
    defer db.DB.Close()

    //Set gin mode
    if cfg.Environment == "production" {
        gin.SetMode(gin.ReleaseMode)
    }

	/* Initialize router with middleware */
	r := gin.New()
    r.Use(gin.Recovery())
    r.Use(gin.Logger())


	sererAddr := cfg.Server.Host + ":" + cfg.Server.Port
	log.Infof("BookingService started on %s and listening...", sererAddr)

    srv := &http.Server{
        Addr: sererAddr,
        Handler: r,
        ReadTimeout: cfg.Server.ReadTimeout,
        WriteTimeout: cfg.Server.WriteTimeout,
    }
    if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
        log.Fatal("Server failed to start: ", err) 
    }
}
