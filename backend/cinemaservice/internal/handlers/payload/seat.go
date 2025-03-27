package payload

import "time"

type SeatReponse struct {
	ID             uint      `json:"seatId"`
	AuditoriumID   uint      `json:"auditoriumId"`
	SeatCode       string    `json:"seatCode"`
	CurrentStatus  string    `json:"currentStatus"`
	CreatedAt      time.Time `json:"createdAt"`
	LastModifiedAt time.Time `json:"lastModifiedAt"`
	LastModifiedBy string    `json:"lastModifiedBy"`
	CreatedBy      string    `json:"createdBy"`
}
type CreateSeatRequest struct {
	AuditoriumID   uint
	SeatCode       string
	CurrentStatus  string
	LastModifiedBy string
	CreatedBy      string
}

type UpdateSeatRequest struct {
	AuditoriumID   uint
	SeatCode       string
	CurrentStatus  string
	LastModifiedBy string
}
