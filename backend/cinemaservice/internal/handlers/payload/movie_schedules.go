package payload

type MovieScheduleRequest struct {
	MovieID        uint   `json:"movie_id" binding:"required"`
	AuditoriumID   uint   `json:"auditorium_id" binding:"required"`
	StartAt        string `json:"start_at" binding:"required"`
	EndAt          string `json:"end_at" binding:"required"`
	ScheduleStatus string `json:"schedule_status" binding:"required"`
}

type UpdateMovieScheduleRequest struct {
	ID             uint   `json:"id" binding:"required"`
	MovieID        uint   `json:"movie_id" binding:"required"`
	AuditoriumID   uint   `json:"auditorium_id" binding:"required"`
	StartAt        string `json:"start_at" binding:"required"`
	EndAt          string `json:"end_at" binding:"required"`
	ScheduleStatus string `json:"schedule_status" binding:"required"`
}

type MovieScheduleResponse struct {
	ID             uint   `json:"id" binding:"required"`
	MovieID        uint   `json:"movie_id" binding:"required"`
	AuditoriumID   uint   `json:"auditorium_id" binding:"required"`
	StartAt        string `json:"start_at" binding:"required"`
	EndAt          string `json:"end_at" binding:"required"`
	ScheduleStatus string `json:"schedule_status" binding:"required"`
}
