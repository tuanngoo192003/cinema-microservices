package usecase

import (
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"
	"cinema-service/internal/repo"
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
func (r *ReservedSeatUseCase) Create(param payload.ReservedSeatRequest) (result entity.ReservedSeat, err error) {
	var obj entity.ReservedSeat
	payload.MapStruct(param, &obj)
	result, err = r.repo.Create(obj)
	return
}
