package payload

import "time"

type CreateScheduleRequest struct {
	MovieID        uint
	AuditoriumID   uint
	StartAt        time.Time
	EndAt          time.Time
	LastModifiedBy string
	CreatedBy      string
	ScheduleStatus string
}

type ScheduleResponse struct {
	ID             uint      `json:"scheduleId"`
	MovieID        uint      `json:"movieId"`
	AuditoriumID   uint      `json:"auditoriumId"`
	StartAt        time.Time `json:"startAt"`
	EndAt          time.Time `json:"endAt"`
	CreatedAt      time.Time `json:"createdAt"`
	LastModifiedAt time.Time `json:"lastModifiedAt"`
	LastModifiedBy string    `json:"lastModifiedBy"`
	CreatedBy      string    `json:"createdBy"`
	ScheduleStatus string    `json:"scheduleStatus"`
}

type UpdateScheduleRequest struct {
	MovieID        uint
	AuditoriumID   uint
	StartAt        time.Time
	EndAt          time.Time
	LastModifiedBy string
	ScheduleStatus string
}
