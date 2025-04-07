package main

import (
	_ "io"
	_ "io/ioutil"
	"net/http"
	"user-service/infra/config"
	"user-service/infra/database"
	"user-service/infra/router"
	"user-service/internal/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load env
	cfg, err := config.Load()

	// Initialize zap
	log := config.Newlogger(config.ConfigLogger{})
	if err != nil {
		log.Fatal("Failed to load config: ", err)
	}

	// Initialize S3
	err = config.NewS3Client(cfg)
	if err != nil {
		log.Fatal("Failed get s3 client: ", err)
	}

	log.Info("UserService started and listening...")

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

	authHandler := handlers.NewAuthHandler(db, cfg.JWT.Secret)
	/* apis of userservice */
	router.AuthApis(authHandler, r, cfg)
	router.UserApis(authHandler, r, cfg)
	router.UploadApis(authHandler, r, cfg)
	userServiceHealth(authHandler, r, cfg)

	sererAddr := cfg.Server.Host + ":" + cfg.Server.Port
	log.Infof("UserService started on %s and listening...", sererAddr)

	srv := &http.Server{
		Addr:         sererAddr,
		Handler:      r,
		ReadTimeout:  cfg.Server.ReadTimeout,
		WriteTimeout: cfg.Server.WriteTimeout,
	}
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal("Server failed to start: ", err)
	}
	log.Info("UserService started and listening...")
}

func userServiceHealth(authHandler *handlers.AuthHandler, r *gin.Engine, cfg *config.Config) {
	protected := r.Group("/")
	{
		protected.GET("", GetServiceInfo)
	}
}

func GetServiceInfo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "UserService started and listening..."})
}
