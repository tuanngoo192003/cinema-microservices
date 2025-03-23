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
	ID             uint
	MovieID        uint
	AuditoriumID   uint
	StartAt        time.Time
	EndAt          time.Time
	CreatedAt      time.Time
	LastModifiedAt time.Time
	LastModifiedBy string
	CreatedBy      string
	ScheduleStatus string
}

type UpdateScheduleRequest struct {
	ID             uint `json:"id" binding:"required"`
	MovieID        uint
	AuditoriumID   uint
	StartAt        time.Time
	EndAt          time.Time
	LastModifiedBy string
	ScheduleStatus string
}
