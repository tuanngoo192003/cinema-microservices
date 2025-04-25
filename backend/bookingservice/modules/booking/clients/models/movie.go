package client_models

import "time"

type Movie struct {
	MovieId        int       `json:"movieId"`
	ReleaseDate    time.Time `json:"releaseDate"`
	MovieName      string    `json:"movieName"`
	StartAt        string    `json:"startAt"`
	EndAt          string    `json:"endAt"`
	Price          float64   `json:"price"`
	MovieGenre     string    `json:"movieGenre"`
	Description    string    `json:"description"`
	ImageURL       string    `json:"imageUrl"`
	AuditoriumName string    `json:"auditoriumName"`
}
