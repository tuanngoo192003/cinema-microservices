package payload

type MovieRequest struct {
	MovieName      string    `json:"movie_name"`
	Description    string    `json:"description"`
	ReleaseDate    string	 `json:"release_date"`
	MovieGenre     string    `json:"movie_genre"`
}

type UpdateMovieRequest struct {
	ID             uint      `json:"id"`
	MovieName      string    `json:"movie_name"`
	Description    string    `json:"description"`
	ReleaseDate    string    `json:"release_date"`
	MovieGenre     string    `json:"movie_genre"`
}

type MovieResponse struct {
	ID             uint      `json:"id"`
	MovieName      string    `json:"movie_name"`
	Description    string    `json:"description"`
	ReleaseDate    string	 `json:"release_date"`
	MovieGenre     string    `json:"movie_genre"`
}
