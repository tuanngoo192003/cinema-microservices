package schema

import (
	"time"

	_ "github.com/lib/pq"
)

type Seat struct {
	ID             uint      `gorm:"primaryKey;not null"`
	authoriumID    uint      `gorm:"column:authorium_id"`
	seatCode       string    `gorm:"column:seat_code"`
	currentStatus  string    `gorm:"column:current_status"`
	createdAt      time.Time `gorm:"column:created_at"`
	lastModifiedAt time.Time `gorm:"column:last_modified_at"`
	lastModifiedBy string    `gorm:"column:last_modified_by"`
	createdBy      string    `gorm:"column:created_by;type:varchar(50)"`
	isDeleted      bool      `gorm:"column:is_deleted"`
}
