package entity

import (
	"time"

	_ "gorm.io/gorm"
)

type Auditorium struct {
	AuditoriumID   uint      `gorm:"column:auditorium_id;primaryKey;not null"`
	AuditoriumName string    `gorm:"column:auditorium_name"`
	Rows           uint      `gorm:"column:rows"`
	Cols           uint      `gorm:"column:cols"`
	CreatedAt      time.Time `gorm:"column:created_at;autoCreateTime"`
	LastModifiedAt time.Time `gorm:"column:last_modified_at; autoUpdateTime"`
	LastModifiedBy string    `gorm:"column:last_modified_by"`
	CreatedBy      string    `gorm:"column:created_by;type:varchar(50)"`
	IsDeleted      bool      `gorm:"column:is_deleted"`
}

func (Auditorium) TableName() string {
	return "auditoriums"
}
