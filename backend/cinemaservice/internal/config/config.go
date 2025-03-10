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
    godotenv.Load("run/secrets/.env") 

    cfg := &Config{}
    
    //Server config
    cfg.Server.Host = getEnv("USER_SERVER_HOST", "")
    cfg.Server.Port = getEnv("CINEMA_SERVER_PORT", "8001")
    cfg.Server.ReadTimeout = time.Second * 15 
    cfg.Server.WriteTimeout = time.Second * 15

    //Database config 
    cfg.Database.Host = getEnv("USER_DB_HOST", "userdb")
    cfg.Database.Port = getEnv("USER_DB_PORT", "5432")
    cfg.Database.User = getEnv("USER_DB_USER", "postgres")
    cfg.Database.Password = getEnv("USER_DB_PASSWORD", "postgres")
    cfg.Database.DBName = getEnv("USER_DB_Name", "userservicedb")
    cfg.Database.SSLMode = getEnv("USER_DB_SSLMODE", "disable")

    //JWT config 
    cfg.JWT.Secret = getEnv("JWT_SECRET", "your-secret-key")
    cfg.JWT.Tokenexpiry = time.Hour * 24
    cfg.JWT.RefreshExpiry = time.Hour * 168 

    cfg.Environment = getEnv("ENV", "development")

    return cfg, nil
}

// func Load() (*Config, error) {
//     godotenv.Load("run/secrets/.env") 
//
//     cfg := &Config{}
//    
//     //Server config
//     cfg.Server.Host = getEnv("CINEMA_SERVER_HOST", "")
//     cfg.Server.Port = getEnv("CINEMA_SERVER_PORT", "8001")
//     cfg.Server.ReadTimeout = time.Second * 15 
//     cfg.Server.WriteTimeout = time.Second * 15
//
//     //Database config 
//     cfg.Database.Host = getEnv("CINEMA_DB_HOST", "cinemadb")
//     cfg.Database.Port = getEnv("CINEMA_DB_PORT", "5433")
//     cfg.Database.User = getEnv("CINEMA_DB_USER", "postgres")
//     cfg.Database.Password = getEnv("CINEMA_DB_PASSWORD", "postgres")
//     cfg.Database.DBName = getEnv("CINEMA_DB_Name", "cinemaservicedb")
//     cfg.Database.SSLMode = getEnv("CINEMA_DB_SSLMODE", "disable")
//
//     //JWT config 
//     cfg.JWT.Secret = getEnv("JWT_SECRET", "your-secret-key")
//     cfg.JWT.Tokenexpiry = time.Hour * 24
//     cfg.JWT.RefreshExpiry = time.Hour * 168 
//
//     cfg.Environment = getEnv("ENV", "development")
//
//     return cfg, nil
// }
//
func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func (c *Config) GetDSN() string {
	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s",
            c.Database.User,
            c.Database.Password,
            c.Database.Host,
            c.Database.Port,
            c.Database.DBName,
            c.Database.SSLMode,
    )
}




