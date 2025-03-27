package payload

import "time"

type AuditoriumResponse struct {
	ID             uint      `json:"auditoriumId"`
	AuditoriumName string    `json:"auditoriumName"`
	Capacity       uint      `json:"capacity"`
	CreatedAt      time.Time `json:"createdAt"`
	LastModifiedAt time.Time `json:"lastModifiedAt"`
	LastModifiedBy string    `json:"lastModifiedBy"`
	CreatedBy      string    `json:"createdBy"`
}
type AuditoriumRequest struct {
	AuditoriumName string `json:"auditoriumName"`
	Capacity       uint   `json:"capacity"`
	CreatedBy      string `json:"createdBy"`
	IsDeleted      bool   `json:"isDeleted"`
	LastModifiedBy string `json:"lastModifiedBy"`
}
