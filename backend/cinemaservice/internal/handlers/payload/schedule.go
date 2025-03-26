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
	ScheduleID     uint
	MovieID        uint
	AuditoriumID   uint
	StartAt        time.Time
	EndAt          time.Time
	ScheduleStatus string
	SeatLeft       int
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
