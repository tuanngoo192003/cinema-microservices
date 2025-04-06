package models

type BookingCreate struct {
	MovieID        int                 `json:"movieId"`
	MovieName      string              `json:"movieName"`
	Description    string              `json:"description"`
	AuditoriumName string              `json:"auditoriumName"`
	ReleaseDate    string              `json:"releaseDate"`
	StartAt        string              `json:"startAt"`
	EndAt          string              `json:"endAt"`
	MoviePrice     float64             `json:"moviePrice"`
	MovieGenre     string              `json:"movieGenre"`
	UserID         int                 `json:"userId"`
	ScheduleID     int                 `json:"scheduleId"`
	Seats          []BookingSeatCreate `json:"seats"`
	TotalPrice     float64             `json:"totalPrice"`
	Status         string              `json:"status"`
}

type BookingSeatCreate struct {
	SeatID   int    `json:"seatId"`
	SeatCode string `json:"seatCode"`
}
