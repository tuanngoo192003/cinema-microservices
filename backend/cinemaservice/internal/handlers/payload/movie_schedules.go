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
	ID             uint   `json:"id"`
	MovieID        uint   `json:"movie_id"`
	AuditoriumID   uint   `json:"auditorium_id"`
	StartAt        string `json:"start_at"`
	EndAt          string `json:"end_at"`
	ScheduleStatus string `json:"schedule_status"`
}

type GetByIDMovieScheduleResponse struct {
	ID             uint          `json:"id"`
	Movie          MovieResponse `json:"movie"`
	AuditoriumID   uint          `json:"auditorium_id"`
	StartAt        string        `json:"start_at"`
	EndAt          string        `json:"end_at"`
	ScheduleStatus string        `json:"schedule_status"`
}
