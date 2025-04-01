package usecase

import (
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"
	"cinema-service/internal/repo"

	"github.com/tuanngoo192003/golang-utils/utils"
)

type ScheduleUsecase struct {
	repo *repo.ScheduleRepo
}

func NewScheduleUsecase(repo *repo.ScheduleRepo) *ScheduleUsecase {
	return &ScheduleUsecase{repo: repo}
}

func (r *ScheduleUsecase) Search(param payload.ScheduleSearchRequest) (result []entity.Schedule, err error) {
	if param.Perpage == 0 {
		param.Perpage = utils.DEFAULT_PAGE
	}
	if param.Page == 0 {
		param.Page = utils.DEFAULT_SIZE
	}
	if param.StartLower.IsZero() {
		param.StartLower = getDefaultTimeStart()
	}
	if param.StartUpper.IsZero() {
		param.StartUpper = getDefaultTimeEnd()
	}
	if param.EndLower.IsZero() {
		param.EndLower = getDefaultTimeStart()
	}
	if param.EndUpper.IsZero() {
		param.EndUpper = getDefaultTimeEnd()
	}
	if param.LastModifiedStart.IsZero() {
		param.LastModifiedStart = getDefaultTimeStart()
	}
	if param.LastModifiedEnd.IsZero() {
		param.LastModifiedEnd = getDefaultTimeEnd()
	}
	if param.CreatedStart.IsZero() {
		param.CreatedStart = getDefaultTimeStart()
	}
	if param.CreatedEnd.IsZero() {
		param.CreatedEnd = getDefaultTimeEnd()
	}
	if param.StatusSchedule == "" {
		param.StatusSchedule = entity.StatusScheduleActive
	}

	result, err = r.repo.Search(param)

	return
}
func (r *ScheduleUsecase) Create(obj entity.Schedule) (result entity.Schedule, err error) {
	result, err = r.repo.Create(obj)
	return
}
func (r *ScheduleUsecase) UpdateExpired() (err error) {
	err = r.repo.UpdateExpired()
	return
}
