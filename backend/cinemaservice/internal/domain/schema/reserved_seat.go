package schema

import (
	"time"

	_ "github.com/lib/pq"
)

type ReservedSeat struct {
	ID          uint      `gorm:"primaryKey;not null"`
	schedule_id uint      `gorm:"column:schedule_id"`
	seat_id     uint      `gorm:"column:seat_id"`
	user_id     uint      `gorm:"column:user_id"`
	createdAt   time.Time `gorm:"column:created_at"`
}
