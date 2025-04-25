package payload

type CreateAuditoriumRequest struct {
	AuditoriumName string `json:"auditorium_name"`
	Rows           int    `json:"rows"`
	Columns        int    `json:"columns"`
}

type UpdateAuditoriumRequest struct {
	AuditoriumID   int    `json:"auditorium_id"`
	AuditoriumName string `json:"auditorium_name"`
	Rows           int    `json:"rows"`
	Columns        int    `json:"numbers"`
}

type AuditoriumResponse struct {
	AuditoriumID   int    `json:"auditorium_id"`
	AuditoriumName string `json:"auditorium_name"`
	Rows           int    `json:"rows"`
	Columns        int    `json:"columns"`
}

type AuditoriumSelectResponse struct {
	AuditoriumID   int    `json:"auditorium_id"`
	AuditoriumName string `json:"auditorium_name"`
}

type AuditoriumWithSeatResponse struct {
	AuditoriumID   int                `json:"auditoriumId"`
	AuditoriumName string             `json:"auditoriumName"`
	Rows           int                `json:"rows"`
	Columns        int                `json:"columns"`
	Seats          []SeatInfoResponse `json:"seats"`
}
