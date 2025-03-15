package schema

import (
	"time"

	_ "github.com/lib/pq"
)

type Movie struct {
	ID             uint      `gorm:"primaryKey;not null"`
	movieName      string    `gorm:"column:movie_name"`
	description    string    `gorm:"column:description"`
	releaseDate    time.Time `gorm:"column:release_date"`
	CreatedAt      time.Time `gorm:"column:created_at"`
	LastModifiedAt time.Time `gorm:"column:last_modified_at"`
	LastModifiedBy string    `gorm:"column:last_modified_by"`
	CreatedBy      string    `gorm:"column:created_by;type:varchar(50)"`
	isDeleted      bool      `gorm:"column:is_deleted"`
	movieGenre     string    `gorm:"column:movie_genre"`
}
