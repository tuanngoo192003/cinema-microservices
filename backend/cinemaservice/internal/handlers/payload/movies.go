package payload

import "time"

type CreateMovieRequest struct {
	MovieName   string `json:"movieName"`
	ImageURL    string `json:"imageURL"`
	Duration    int    `json:"duration"`
	Description string `json:"description"`
	ReleaseDate string `json:"releaseDate"`
	MovieGenre  string `json:"movieGenre"`
}

type UpdateMovieRequest struct {
	ID          uint   `json:"id"`
	MovieName   string `json:"movieName"`
	ImageURL    string `json:"imageURL"`
	Duration    int    `json:"duration"`
	Description string `json:"description"`
	ReleaseDate string `json:"releaseDate"`
	MovieGenre  string `json:"movieGenre"`
	IsDeleted   bool   `json:"isDeleted"`
}

type MovieResponse struct {
	MovieID     uint      `json:"movieId"`
	MovieName   string    `json:"movieName"`
	ImageURL    string    `json:"imageURL"`
	Duration    int       `json:"duration"`
	Description string    `json:"description"`
	ReleaseDate time.Time `json:"releaseDate"`
	MovieGenre  string    `json:"movieGenre"`
}
