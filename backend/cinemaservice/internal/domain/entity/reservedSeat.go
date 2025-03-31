package entity

import (
	"time"

	_ "github.com/lib/pq"
)

type ReservedSeat struct {
	ID         uint      `gorm:"primaryKey;not null"`
	ScheduleID uint      `gorm:"column:schedule_id"`
	SeatID     uint      `gorm:"column:seat_id;unique"`
	UserID     uint      `gorm:"column:user_id"`
	CreatedAt  time.Time `gorm:"column:created_at; autoCreateTime"`
	Schedule   Schedule  `gorm:"foreignKey:ScheduleID;references:ID"`
	Seat       Seat      `gorm:"foreignKey:SeatID;references:ID"`
}
