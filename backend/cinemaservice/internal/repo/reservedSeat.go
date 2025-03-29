package repo

import (
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"

	"gorm.io/gorm"
)

type ReservedSeatRepo struct {
	db *gorm.DB
}

func NewReservedSeatRepo(db *gorm.DB) *ReservedSeatRepo {
	return &ReservedSeatRepo{db}
}

func (r *ReservedSeatRepo) Search(param payload.ReservedSeatSearchRequest) (result []entity.ReservedSeat, err error) {
	query := r.db.Model(&entity.ReservedSeat{})
	if param.ScheduleID != 0 {
		query = r.db.Where("schedule_id = ?", param.ScheduleID)
	}
	if param.SeatID != 0 {
		query = r.db.Where("seat_id = ?", param.SeatID)
	}
	if param.UserID != 0 {
		query = r.db.Where("user_id = ?", param.UserID)
	}
	if param.ID != 0 {
		query = r.db.Where("id = ?", param.ID)
	}

	query.Find(&result)
	err = query.Error
	return
}

func (r *ReservedSeatRepo) Create(param entity.ReservedSeat) (result entity.ReservedSeat, err error) {
	query := r.db.Model(&entity.ReservedSeat{}).Create(&param)
	if query.Error != nil {
		err = query.Error
		return
	}
	result = param
	return
}
