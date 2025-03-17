package database

import (
	"cinema-service/internal/domain/entity"
	"log"

	"gorm.io/gorm"
)

func Migrate(DB *gorm.DB) {
	err := DB.AutoMigrate(&entity.Auditorium{})
	if err != nil {
		log.Fatal("Migration fail", err)
	}
	log.Println("Sucess Migration")
}
