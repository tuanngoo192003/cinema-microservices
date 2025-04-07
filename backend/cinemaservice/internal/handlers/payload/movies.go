package payload

import "time"

type CreateMovieRequest struct {
	MovieName   string   `json:"movieName"`
	ImageURL    string   `json:"imageURL"`
	Duration    int      `json:"duration"`
	Description string   `json:"description"`
	ReleaseDate string   `json:"releaseDate"`
	MovieGenre  []string `json:"movieGenre"`
	Price       float64  `json:"moviePrice"`
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
	MoviePrice  float64   `json:"moviePrice"`
	MovieName   string    `json:"movieName"`
	ImageURL    string    `json:"imageURL"`
	Duration    int       `json:"duration"`
	Description string    `json:"description"`
	ReleaseDate time.Time `json:"releaseDate"`
	MovieGenre  string    `json:"movieGenre"`
}

type MovieSelectResponse struct {
	MovieID     uint    `json:"movieId"`
	MovieName   string  `json:"movieName"`
	MoviePrice  float64 `json:"moviePrice"`
	Duration    int     `json:"duration"`
	ReleaseDate string  `json:"releaseDate"`
}
