package main

import (
	"net/http"
	"user-service/internal/config"
	"user-service/internal/database"
	"user-service/internal/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg, err := config.Load()

	log := config.Newlogger(config.ConfigLogger{})

	log.Info("UserService started and listening...")

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

	authHandler := handlers.NewAuthHandler(db, cfg.JWT.Secret)
	/* apis of userservice */
	userApis(authHandler, r, cfg)

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

func userApis(authHandler *handlers.AuthHandler, r *gin.Engine, cfg *config.Config) {
	protected := r.Group("/")
	{
		protected.GET("", GetServiceInfo)
		protected.GET("login", authHandler.Login)
		protected.GET("/user/:id", TestGetUserByIdProxy)
		protected.POST("/user", TestCreateUser)
		protected.PUT("/user", TestUpdateUser)
	}
}

func TestUpdateUser(c *gin.Context) {
	var newUser struct {
		Id       string `json:"id"`
		Username string `json:"username"`
	}
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}
	c.JSON(http.StatusOK, gin.H{newUser.Id: newUser.Username})

}

func TestCreateUser(c *gin.Context) {
	var newUser struct {
		Username string `json:"username"`
	}
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}
	c.JSON(http.StatusOK, gin.H{"message": newUser.Username})
}

func TestGetUserByIdProxy(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": c.Param("id")})
}

func GetServiceInfo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "UserService started and listening..."})
}
