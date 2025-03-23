package payload

import "time"

type CreateMovieRequest struct {
	MovieName      string    `json:"movieName"`
	Description    string    `json:"description"`
	ReleaseDate    time.Time `json:"releaseDate"`
	LastModifiedBy string    `json:"lastModifiedBy"`
	MovieGenre     string    `json:"movieGenre"`
	CreatedBy      string    `json:"createdBy"`
}

type UpdateMovieRequest struct {
	ID             uint      `json:"id"`
	MovieName      string    `json:"movieName"`
	Description    string    `json:"description"`
	ReleaseDate    time.Time `json:"releaseDate"`
	LastModifiedBy string    `json:"lastModifiedBy"`
	MovieGenre     string    `json:"movieGenre"`
}

type MovieResponse struct {
	MovieID        uint      `json:"movieId"`
	MovieName      string    `json:"movieName"`
	Description    string    `json:"description"`
	ReleaseDate    time.Time `json:"releaseDate"`
	LastModifiedBy string    `json:"lastModifiedBy"`
	MovieGenre     string    `json:"movieGenre"`
	CreatedAt      time.Time `json:"createdAt"`
	LastModifiedAt time.Time `json:"lastModifiedAt"`
	CreatedBy      string    `json:"createdBy"`
}
