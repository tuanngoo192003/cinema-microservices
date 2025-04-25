package payload

type MovieScheduleRequest struct {
	MovieID        uint    `json:"movieId" binding:"required"`
	MoviePrice     float64 `json:"moviePrice" binding:"required"`
	AuditoriumID   uint    `json:"auditoriumId" binding:"required"`
	StartAt        string  `json:"startAt" binding:"required"`
	EndAt          string  `json:"endAt" binding:"required"`
	ScheduleStatus string  `json:"scheduleStatus" binding:"required"`
}

type UpdateMovieScheduleRequest struct {
	ID             uint   `json:"id" binding:"required"`
	MovieID        uint   `json:"movieId" binding:"required"`
	AuditoriumID   uint   `json:"auditoriumId" binding:"required"`
	StartAt        string `json:"startAt" binding:"required"`
	EndAt          string `json:"endAt" binding:"required"`
	ScheduleStatus string `json:"scheduleStatus" binding:"required"`
}

type MovieScheduleResponse struct {
	ID             uint   `json:"id"`
	MovieID        uint   `json:"movieId"`
	MovieName      string `json:"movieName"`
	AuditoriumID   uint   `json:"auditoriumId"`
	AuditoriumName string `json:"auditoriumName"`
	StartAt        string `json:"startAt"`
	EndAt          string `json:"endAt"`
	ScheduleStatus string `json:"scheduleStatus"`
	SeatLeft       int    `json:"seatLeft"`
}

type GetByIDMovieScheduleResponse struct {
	ID             uint          `json:"id"`
	Movie          MovieResponse `json:"movie"`
	AuditoriumID   uint          `json:"auditoriumId"`
	StartAt        string        `json:"startAt"`
	EndAt          string        `json:"endAt"`
	ScheduleStatus string        `json:"scheduleStatus"`
}

type GetMovieScheduleDetailsResponse struct {
	ID             int                        `json:"id"`
	Movie          MovieResponse              `json:"movie"`
	Auditorium     AuditoriumWithSeatResponse `json:"auditorium"`
	StartAt        string                     `json:"startAt"`
	EndAt          string                     `json:"endAt"`
	ScheduleStatus string                     `json:"scheduleStatus"`
	SeatLeft       int                        `json:"seatLeft"`
}
