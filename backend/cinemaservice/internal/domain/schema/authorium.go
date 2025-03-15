package schema

import (
	"time"

	_ "gorm.io/gorm"
)

type Authorium struct {
	ID             uint      `gorm:"primaryKey;not null"`
	authoriumName  string    `gorm:"column:authorium_name"`
	capacity       uint      `gorm:"column:capacity"`
	createdAt      time.Time `gorm:"column:created_at"`
	lastModifiedAt time.Time `gorm:"column:last_modified_at"`
	lastModifiedBy string    `gorm:"column:last_modified_by"`
	createdBy      string    `gorm:"column:created_by;type:varchar(50)"`
	isDeleted      bool      `gorm:"column:is_deleted"`
}
