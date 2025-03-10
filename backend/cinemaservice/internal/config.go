package config

import (
	"os"
	"time"
    "fmt"
	"github.com/joho/godotenv"
)

type Config struct {
	Server struct {
		Port         string
		Host         string
		ReadTimeout  time.Duration
		WriteTimeout time.Duration
	}

	Database struct {
		Host     string
		Port     string
		User     string
		Password string
		DBName   string
		SSLMode  string
	}

	JWT struct {
		Secret        string
		Tokenexpiry   time.Duration
		RefreshExpiry time.Duration
	}

	Environment string
}

func Load() (*Config, error) {
    godotenv.Load("../.env") 

    cfg := &Config{}
    
    //Server config
    cfg.Server.Host = getEnv("SERVER_HOST", "localhost")
    cfg.Server.Port = getEnv("SERVER_PORT", "8080")
    cfg.Server.ReadTimeout = time.Second * 15 
    cfg.Server.WriteTimeout = time.Second * 15

    //Database config 
    cfg.Database.Host = getEnv("DB_HOST", "host.docker.internal")
    cfg.Database.Port = getEnv("DB_PORT", "5432")
    cfg.Database.User = getEnv("DB_USER", "postgres")
    cfg.Database.Password = getEnv("DB_PASSWORD", "postgres")
    cfg.Database.DBName = getEnv("DB_Name", "human_resource_management_system")
    cfg.Database.SSLMode = getEnv("DB_SSLMODE", "disable")

    //JWT config 
    cfg.JWT.Secret = getEnv("JWT_SECRET", "your-secret-key")
    cfg.JWT.Tokenexpiry = time.Hour * 24
    cfg.JWT.RefreshExpiry = time.Hour * 168 

    cfg.Environment = getEnv("ENV", "development")

    return cfg, nil
}

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func (c *Config) GetDSN() string {
    return fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
            c.Database.Host,
            c.Database.Port,
            c.Database.User,
            c.Database.Password,
            c.Database.DBName,
            c.Database.SSLMode,
        )
}




