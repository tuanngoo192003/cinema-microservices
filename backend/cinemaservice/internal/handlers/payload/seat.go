package payload

import "time"

type SeatReponse struct {
	ID             uint
	AuthoriumID    uint
	SeatCode       string
	CurrentStatus  string
	CreatedAt      time.Time
	LastModifiedAt time.Time
	LastModifiedBy string
	CreatedBy      string
}
type CreateSeatRequest struct {
	AuthoriumID    uint
	SeatCode       string
	CurrentStatus  string
	LastModifiedBy string
	CreatedBy      string
}

type UpdateSeatRequest struct {
	ID             uint `json:"id" binding:"required"`
	AuthoriumID    uint
	SeatCode       string
	CurrentStatus  string
	LastModifiedBy string
}
