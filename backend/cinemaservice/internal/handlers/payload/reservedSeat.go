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


type ReservedSeatSearchRequest struct {
	UserID     uint `form:"userId"`
	SeatID     uint `form:"seatId"`
	ScheduleID uint `form:"scheduleId"`
	ID         uint `form:"id"`
}
