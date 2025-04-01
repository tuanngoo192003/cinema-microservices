package repo

import (
	"cinema-service/infra/config"
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"
	"time"

	"github.com/tuanngoo192003/golang-utils/utils"
	"gorm.io/gorm"
)

type ScheduleRepo struct {
	db *gorm.DB
}

func NewScheduleRepo(db *gorm.DB) *ScheduleRepo {
	return &ScheduleRepo{db}
}

func (r *ScheduleRepo) Search(param payload.ScheduleSearchRequest) (result []entity.Schedule, err error) {
	query := r.db.Model(&entity.Schedule{})
	query = query.Where("start_at BETWEEN ? AND ?", param.StartLower, param.StartUpper)
	query = query.Where("end_at BETWEEN ? AND ?", param.EndLower, param.EndUpper)
	query = query.Where("last_modified_at BETWEEN ? AND ?", param.LastModifiedStart, param.LastModifiedEnd)
	query = query.Where("created_at BETWEEN ? AND ?", param.CreatedStart, param.CreatedEnd)
	query = query.Where("status_schedule = ?", param.StatusSchedule)
	query = query.Where("is_deleted = ?", param.IsDeleted)
	if param.ID != 0 {
		query = query.Where("id = ?", param.ID)
	}
	if param.MovieID != 0 {
		query = query.Where("movie_id = ?", param.MovieID)
	}
	if param.AuditoriumID != 0 {
		query = query.Where("auditorium_id = ?", param.AuditoriumID)
	}
	if param.CreatedBy != "" {
		query = query.Where("created_by = ?", param.CreatedBy)
	}
	if param.LastModifiedBy != "" {
		query = query.Where("last_modified_by = ?", param.LastModifiedBy)
	}
	offset := utils.GetOffset(param.Page, &param.Perpage)
	query = query.Offset(offset).Limit(param.Perpage)
	query = query.Order("start_at ASC")
	query.Find(&result)
	err = query.Error
	return
}

func (r *ScheduleRepo) Create(obj entity.Schedule) (result entity.Schedule, err error) {
	log := config.GetLogger()
	query := r.db.Model(&entity.Schedule{}).Create(&obj)
	if query.Error != nil {
		log.Error("Error creating reserved seat: ", query.Error)
		err = query.Error
		return
	}
	result = obj
	return
}

func (r *ScheduleRepo) Clean(id int) error {
	query := r.db.Model(&entity.Schedule{}).Where("id = ?", id).Delete(&entity.Schedule{})
	if query.Error != nil {
		return query.Error
	}
	return nil
}

func (r *ScheduleRepo) CleanExpiredSeats(expiredBefore time.Time) error {
	log := config.GetLogger()
	result := r.db.Where("created_at < ?", expiredBefore).Delete(&entity.Schedule{})
	if result.Error != nil {
		log.Error("Error deleting expired seats: ", result.Error)
		return result.Error
	}
	log.Info("Deleted expired seats: ", result.RowsAffected)
	return nil

}
func (r *ScheduleRepo) Delete(id uint) (err error) {
	log := config.GetLogger()
	query := r.db.Model(&entity.Schedule{}).Where("id = ?", id).Delete(&entity.Schedule{})
	if query.Error != nil {
		log.Error("Error deleting reserved seat: ", query.Error)
	}
	err = query.Error
	return err
}

func (r *ScheduleRepo) UpdateExpired() (err error) {
	log := config.GetLogger()
	obj := entity.Schedule{
		ScheduleStatus: entity.StatusScheduleExpired,
	}
	query := r.db.Model(&entity.Schedule{}).Where("end_at < ?", time.Now()).Updates(&obj)
	if query.Error != nil {
		log.Error("Error updating schedule: ", query.Error)
		err = query.Error
	}
	log.Info("Updated schedule: ", query.RowsAffected)
	return
}
