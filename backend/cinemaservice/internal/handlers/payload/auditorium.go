package payload

type CreateAuditoriumRequest struct {
	AuditoriumName string `json:"auditorium_name"`
	Rows           int    `json:"rows"`
	Columns        int    `json:"numbers"`
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
	Columns        int    `json:"numbers"`
}
