package models

type PaginationResponse[T any] struct {
	Page        int   `json:"page"`
	Perpage     int   `json:"perpage"`
	Data        []T   `json:"data"`
	TotalRecord int64 `json:"totalRecord"`
	TotalPage   int64 `json:"totalPage"`
}

type BaseModel struct {
	IsDeleted      bool   `json:"isDeleted"`
	CreatedBy      string `json:"createdBy"`
	LastModifiedBy string `json:"lastModifiedBy"`
	CreatedAt      string `json:"createdAt"`
	LastModifiedAt string `json:"lastModifiedAt"`
}
