package entity

import (
	"time"

	_ "github.com/lib/pq"
)

type ReservedSeat struct {
	ID          uint      `gorm:"primaryKey;not null"`
	Schedule_id uint      `gorm:"column:schedule_id"`
	Seat_id     uint      `gorm:"column:seat_id"`
	User_id     uint      `gorm:"column:user_id"`
	CreatedAt   time.Time `gorm:"column:created_at; autoCreateTime"`
}

func (ReservedSeat) TableName() string {
	return "reserved_seat"
}
