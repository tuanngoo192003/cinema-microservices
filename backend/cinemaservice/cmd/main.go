package main

import (
	"cinema-service/infra/config"
	"cinema-service/infra/database"
	"cinema-service/infra/router"
	"cinema-service/internal/handlers"
	"cinema-service/internal/job"

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
	sqlDB, errDB := db.DB()
	if errDB != nil {
		log.Fatal("Can't get db from orm", err)
	}
	defer sqlDB.Close()

	//Set gin mode
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}
	log.Infof("CinemaService started on %s and listening...")
	/* Initialize router with middleware */
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(gin.Logger())

	authHandler := handlers.NewAuthHandler(db, cfg.JWT.Secret)
	/* apis of cinemaservice*/
	cinemaApis(authHandler, r, cfg)

	router.Setup(db, r)
	go job.SetupJob(db)
	sererAddr := cfg.Server.Host + ":" + cfg.Server.Port
	log.Infof("CinemaService started on %s and listening...", sererAddr)

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

func cinemaApis(authHandler *handlers.AuthHandler, r *gin.Engine, cfg *config.Config) {
	protected := r.Group("/")
	{
		protected.GET("", GetServiceInfo)
	}
}

func GetServiceInfo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "CinemaService started and listening..."})
}
