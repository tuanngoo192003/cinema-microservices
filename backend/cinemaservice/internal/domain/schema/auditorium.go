package schema

import (
	"time"

	_ "gorm.io/gorm"
)

type Auditorium struct {
	ID             uint      `gorm:"primaryKey;not null"`
	AuditoriumName string    `gorm:"column:auditorium_name"`
	Capacity       uint      `gorm:"column:capacity"`
	CreatedAt      time.Time `gorm:"column:created_at;autoCreateTime"`
	LastModifiedAt time.Time `gorm:"column:last_modified_at; autoUpdateTime"`
	LastModifiedBy string    `gorm:"column:last_modified_by"`
	CreatedBy      string    `gorm:"column:created_by;type:varchar(50)"`
	IsDeleted      bool      `gorm:"column:is_deleted"`
}
