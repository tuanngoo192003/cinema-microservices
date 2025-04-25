package database

import (
	"database/sql"
	"time"
	"user-service/infra/config"

	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type Database struct {
    DB *sql.DB
    GORM *gorm.DB
}

func NewDatabase(connectionString string) (*Database, error) {
    //Open raw database connection 
    log := config.GetLogger()
	log.Info(connectionString)

	db, err := sql.Open("postgres", connectionString) 
    if err != nil {
        return nil, err 
    }
    // Configure connection pool for raw database 
    db.SetMaxOpenConns(25) // Limit maximum simulaneous connections 
    db.SetMaxIdleConns(5) //Keep some connection ready 
    db.SetConnMaxLifetime(5 * time.Minute) //Refresh connection periodically 

    
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
    sqlDB.SetMaxOpenConns(25) // Limit maximum simulaneous connections 
    sqlDB.SetMaxIdleConns(5) //Keep some connection ready 
    sqlDB.SetConnMaxLifetime(5 * time.Minute) //Refresh connection periodically 

    return &Database{DB: db, GORM: gorm}, nil
}
