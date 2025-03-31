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

type SeatInfoResponse struct {
	ID       int     `json:"id"`
	SeatCode string  `json:"seatCode"`
	Price    float64 `json:"price"`
	Status   string  `json:"status"`
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
