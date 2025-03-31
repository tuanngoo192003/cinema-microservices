package usecase

import (
	"cinema-service/infra/config"
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"
	"cinema-service/internal/repo"
	"errors"
	"time"
)

type ReservedSeatUseCase struct {
	repo *repo.ReservedSeatRepo
}

func NewReservedSeatUsecase(repo *repo.ReservedSeatRepo) *ReservedSeatUseCase {
	return &ReservedSeatUseCase{repo: repo}
}

func (r *ReservedSeatUseCase) Search(param payload.ReservedSeatSearchRequest) (result []entity.ReservedSeat, err error) {
	result, err = r.repo.Search(param)
	return
}
func (r *ReservedSeatUseCase) Create(obj entity.ReservedSeat) (result entity.ReservedSeat, err error) {
	log := config.GetLogger()

	find, err := r.repo.Search(payload.ReservedSeatSearchRequest{
		SeatID: obj.SeatID,
	})

	if len(find) == 0 {
		result, err = r.repo.Create(obj)
		if err != nil {
			return
		}
		return result, nil
	}
	if err != nil {
		return result, err
	}
	if find[0].CreatedAt.Add(time.Minute * 10).Before(time.Now()) {
		err = r.repo.Delete(find[0].ID)
		if err != nil {
			return
		}
		result, err = r.repo.Create(obj)
		if err != nil {
			return
		}
		return result, nil
	}
	log.Error("seat already reserved")
	return result, errors.New("seat already reserved")
}

func (r *ReservedSeatUseCase) Clean(minutes int) {
	r.repo.CleanExpiredSeats(time.Now().Add(-time.Minute * time.Duration(minutes)))
}
