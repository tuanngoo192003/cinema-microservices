package dto

type ReservedSeatSearchRequest struct {
	UserID     uint `form:"userId"`
	SeatID     uint `form:"seatId"`
	ScheduleID uint `form:"scheduleId"`
	ID         uint `form:"id"`
}
