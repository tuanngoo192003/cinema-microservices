package database

import (
	"cinema-service/infra/config"
	"time"

	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func NewDatabase(connectionString string) (*gorm.DB, error) {
	//Open raw database connection
	log := config.GetLogger()
	log.Info(connectionString)

	//Open GORM connection
	gorm, ormerr := gorm.Open(postgres.Open(connectionString), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if ormerr != nil {
		return nil, ormerr
	}

	sqlDB, sqlErr := gorm.DB()
	if sqlErr != nil {
		return nil, sqlErr
	}
	// Configure connection pool for gorm
	sqlDB.SetMaxOpenConns(25)                 // Limit maximum simulaneous connections
	sqlDB.SetMaxIdleConns(5)                  //Keep some connection ready
	sqlDB.SetConnMaxLifetime(5 * time.Minute) //Refresh connection periodically
	//Migrate(gorm)
	return gorm, nil
}
