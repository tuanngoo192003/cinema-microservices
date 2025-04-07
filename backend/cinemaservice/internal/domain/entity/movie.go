package entity

import (
	"time"

	_ "github.com/lib/pq"
)

type Movie struct {
	MovieID        uint      `gorm:"column:movie_id;primaryKey;not null"`
	MovieName      string    `gorm:"column:movie_name"`
	MoviePrice     float64   `gorm:"column:movie_price"`
	Duration       int       `column:"column:duration"`
	ImageURL       string    `gorm:"column:image_url"`
	Description    string    `gorm:"column:description"`
	ReleaseDate    time.Time `gorm:"column:release_date"`
	CreatedAt      time.Time `gorm:"column:created_at; autoCreateTime"`
	LastModifiedAt time.Time `gorm:"column:last_modified_at; autoUpdateTime"`
	LastModifiedBy string    `gorm:"column:last_modified_by"`
	CreatedBy      string    `gorm:"column:created_by;type:varchar(50)"`
	IsDeleted      bool      `gorm:"column:is_deleted"`
	MovieGenre     string    `gorm:"column:movie_genre"`
}

func (Movie) TableName() string {
	return "movies"
}
