package database

import (
	"cinema-service/internal/domain/entity"
	"log"

	"gorm.io/gorm"
)

func Migrate(DB *gorm.DB) {
	err := DB.AutoMigrate(&entity.Auditorium{})
	err = DB.AutoMigrate(&entity.Movie{})
	err = DB.AutoMigrate(&entity.MovieSchedule{})
	err = DB.AutoMigrate(&entity.ReservedSeat{})
	err = DB.AutoMigrate(&entity.Seat{})
	if err != nil {
		log.Fatal("Migration fail", err)
	}
	log.Println("Sucess Migration")
}
