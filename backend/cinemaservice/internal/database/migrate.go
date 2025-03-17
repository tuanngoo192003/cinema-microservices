package database

import (
	"cinema-service/internal/domain/schema"
	"log"

	"gorm.io/gorm"
)

func Migrate(DB *gorm.DB) {
	err := DB.AutoMigrate(&schema.Auditorium{})
	if err != nil {
		log.Fatal("Migration fail", err)
	}
	log.Println("Sucess Migration")
}
