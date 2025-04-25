package entity

import (
	"time"

	_ "github.com/lib/pq"
)

type MovieSchedule struct {
	ScheduleID     uint      `gorm:"column:schedule_id;primaryKey;not null"`
	MovieID        uint      `gorm:"column:movie_id"`
	Movie          Movie     `gorm:"foreignKey:MovieID;references:MovieID"`
	AuditoriumID   uint      `gorm:"column:auditorium_id"`
	StartAt        time.Time `gorm:"column:start_at"`
	EndAt          time.Time `gorm:"column:end_at"`
	ScheduleStatus string    `gorm:"column:schedule_status;type:enum('DRAFT','CONFIRMED')"`
	CreatedAt      time.Time `gorm:"column:created_at;autoCreateTime"`
	LastModifiedAt time.Time `gorm:"column:last_modified_at; autoUpdateTime"`
	LastModifiedBy string    `gorm:"column:last_modified_by"`
	CreatedBy      string    `gorm:"column:created_by;type:varchar(50)"`
	IsDeleted      bool      `gorm:"column:is_deleted"`
}

func (MovieSchedule) TableName() string {
	return "movie_schedule"
}
