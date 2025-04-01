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
type ScheduleSearchRequest struct {
	Page              int       `form:"page"`
	Perpage           int       `form:"perpage"`
	MovieID           uint      `form:"movieId"`
	AuditoriumID      uint      `form:"auditoriumId"`
	ID                uint      `form:"id"`
	IsDeleted         bool      `form:"isDeleted"`
	CreatedBy         string    `form:"createdBy"`
	StatusSchedule    string    `form:"statusSchedule"`
	LastModifiedBy    string    `form:"lastModifiedBy"`
	StartUpper        time.Time `form:"startUpper"`
	StartLower        time.Time `form:"startLower"`
	EndUpper          time.Time `form:"endUpper"`
	EndLower          time.Time `form:"endLower"`
	LastModifiedStart time.Time `form:"lastModifiedStart"`
	LastModifiedEnd   time.Time `form:"lastModifiedEnd"`
	CreatedStart      time.Time `form:"createdStart"`
	CreatedEnd        time.Time `form:"createdEnd"`
}
