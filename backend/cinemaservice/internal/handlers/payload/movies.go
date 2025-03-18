package payload

import "time"

type MoviesRequest struct {
	ID             uint      `gorm:"primaryKey;not null"`
	MovieName      string    `gorm:"column:movie_name"`
	Description    string    `gorm:"column:description"`
	ReleaseDate    time.Time `gorm:"column:release_date"`
	MovieGenre     string    `gorm:"column:movie_genre"`
}

type MoviesResponse struct {
	ID             uint      `gorm:"primaryKey;not null"`
	MovieName      string    `gorm:"column:movie_name"`
	Description    string    `gorm:"column:description"`
	ReleaseDate    time.Time `gorm:"column:release_date"`
	MovieGenre     string    `gorm:"column:movie_genre"`
}
