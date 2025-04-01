package repo

import (
	"cinema-service/infra/config"
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"
	"time"

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

func (r *ReservedSeatRepo) Create(obj entity.ReservedSeat) (result entity.ReservedSeat, err error) {
	query := r.db.Model(&entity.ReservedSeat{}).Create(&obj)
	if query.Error != nil {
		err = query.Error
		return
	}
	result = obj
	return
}

func (r *ReservedSeatRepo) Clean(id int) error {
	query := r.db.Model(&entity.ReservedSeat{}).Where("id = ?", id).Delete(&entity.ReservedSeat{})
	if query.Error != nil {
		return query.Error
	}
	return nil
}
func (r *ReservedSeatRepo) CleanExpiredSeats(expiredBefore time.Time) error {
	log := config.GetLogger()
	result := r.db.Where("created_at < ?", expiredBefore).Delete(&entity.ReservedSeat{})
	if result.Error != nil {
		log.Error("Error deleting expired seats: ", result.Error)
		return result.Error
	}
	log.Info("Deleted expired seats: ", result.RowsAffected)
	return nil

}

func (r *ReservedSeatRepo) Delete(id uint) (err error) {
	log := config.GetLogger()
	query := r.db.Model(&entity.ReservedSeat{}).Where(" seat_id = ?", id).Delete(&entity.ReservedSeat{})
	if query.Error != nil {
		log.Error("Error deleting reserved seat: ", query.Error)
	}
	err = query.Error
	return err
}

func (r *ReservedSeatRepo) DeleteBySeatID(id uint) (err error) {
	log := config.GetLogger()
	query := r.db.Model(&entity.ReservedSeat{}).Where(" seat_id = ?", id).Delete(&entity.ReservedSeat{})
	if query.Error != nil {
		log.Error("Error deleting reserved seat: ", query.Error)
	}
	err = query.Error
	return err
}
