package payload

import "time"

type SeatReponse struct {
	ID             uint      `json:"seatId"`
	AuditoriumID   uint      `json:"auditoriumId"`
	SeatCode       string    `json:"seatCode"`
	CurrentStatus  string    `json:"currentStatus"`
	CreatedAt      time.Time `json:"createdAt"`
	LastModifiedAt time.Time `json:"lastModifiedAt"`
	LastModifiedBy string    `json:"lastModifiedBy"`
	CreatedBy      string    `json:"createdBy"`
}

type SeatInfoResponse struct {
	ID       int     `json:"id"`
	UserID   int     `json:"userId"`
	SeatCode string  `json:"seatCode"`
	Price    float64 `json:"price"`
	Status   string  `json:"status"`
}

type CreateSeatRequest struct {
	AuditoriumID   uint
	SeatCode       string
	CurrentStatus  string
	LastModifiedBy string
	CreatedBy      string
}

type UpdateSeatRequest struct {
	ID             uint
	AuditoriumID   uint
	SeatCode       string
	CurrentStatus  string
	LastModifiedBy string
}

type SetSeatRequest struct {
	ScheduleID int   `json:"schedule_id"`
	SeatIDs    []int `json:"seat_ids"`
	UserID     int   `json:"user_id"`
}

type SetSeatResponse struct {
	Status  int       `json:"status"`
	Message string    `json:"message"`
	Data    MovieInfo `json:"data"`
}

type MovieInfo struct {
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
