package client_models

import "time"

type Movie struct {
	MovieId        int       `json:"movie_id"`
	ReleaseDate    time.Time `json:"release_date"`
	MovieName      string    `json:"movie_name"`
	StartAt        string    `json:"start_at"`
	EndAt          string    `json:"end_at"`
	Price          float64   `json:"price"`
	MovieGenre     string    `json:"movie_genre"`
	Description    string    `json:"description"`
	ImageURL       string    `json:"image_url"`
	AuditoriumName string    `json:"auditorium_name"`
}
