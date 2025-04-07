package entity

import (
	"time"

	_ "github.com/lib/pq"
)

type Seat struct {
	SeatID         uint      `gorm:"column:seat_id;primaryKey;not null"`
	UserID         uint      `gorm:"column:user_id"`
	ScheduleID     uint      `gorm:"column:schedule_id"`
	AuditoriumID   uint      `gorm:"column:auditorium_id"`
	SeatCode       string    `gorm:"column:seat_code"`
	Price          float64   `gorm:"column:price"`
	CurrentStatus  string    `gorm:"column:current_status"`
	CreatedAt      time.Time `gorm:"column:created_at; autoCreateTime"`
	LastModifiedAt time.Time `gorm:"column:last_modified_at; autoUpdateTime"`
	LastModifiedBy string    `gorm:"column:last_modified_by"`
	CreatedBy      string    `gorm:"column:created_by;type:varchar(50)"`
	IsDeleted      bool      `gorm:"column:is_deleted"`
}

func (Seat) TableName() string {
	return "seats"
}
