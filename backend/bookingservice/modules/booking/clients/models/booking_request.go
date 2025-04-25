package client_models

type ValidateBookingRequest struct {
	ScheduleID int   `json:"schedule_id"`
	SeatIDs    []int `json:"seat_ids"`
	UserID     int   `json:"user_id"`
	Token      string
}

type ValidateBookingResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    Movie  `json:"data"`
}
