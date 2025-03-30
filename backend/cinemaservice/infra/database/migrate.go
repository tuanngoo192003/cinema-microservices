package database

import (
	"cinema-service/internal/domain/entity"
	"fmt"

	"gorm.io/gorm"
)

func Migrate(DB *gorm.DB) {
	fmt.Println("Starting migration...")

	err := DB.AutoMigrate(&entity.Auditorium{})
	if err != nil {
		fmt.Printf("Error migrating Auditorium: %v\n", err)
		return
	}
	fmt.Println("Migrated Auditorium successfully!")

	err = DB.AutoMigrate(&entity.Movie{})
	if err != nil {
		fmt.Printf("Error migrating Movie: %v\n", err)
		return
	}
	fmt.Println("Migrated Movie successfully!")

	err = DB.AutoMigrate(&entity.Schedule{})
	if err != nil {
		fmt.Printf("Error migrating Schedule: %v\n", err)
		return
	}
	fmt.Println("Migrated Schedule successfully!")

	err = DB.AutoMigrate(&entity.ReservedSeat{})
	if err != nil {
		fmt.Printf("Error migrating ReservedSeat: %v\n", err)
		return
	}
	fmt.Println("Migrated ReservedSeat successfully!")

	err = DB.AutoMigrate(&entity.Seat{})
	if err != nil {
		fmt.Printf("Error migrating Seat: %v\n", err)
		return
	}
	fmt.Println("Migrated Seat successfully!")

	fmt.Println("✅ Migration completed successfully!")
}
