package payload

import (
	_ "github.com/lib/pq"
)

type ReservedSeatReponse struct {
	ID         uint `json:"reservedSeatId"`
	ScheduleID uint `json:"scheduleId"`
	SeatID     uint `json:"seatId"`
	UserID     uint `json:"userId"`
}

type ReservedSeatRequest struct {
	ScheduleID uint `json:"scheduleId"`
	SeatID     uint `json:"seatId"`
	UserID     uint `json:"userId"`
}
