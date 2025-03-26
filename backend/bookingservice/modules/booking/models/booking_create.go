package models

type BookingCreate struct {
	ScheduleID int   `json:"schedule_id"`
	SeatIDs    []int `json:"seat_ids"`
}