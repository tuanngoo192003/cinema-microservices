package payload

import (
	"reflect"
)

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

func MapStruct[S any, D any](src S, dest *D) {
	srcVal := reflect.ValueOf(src)
	destVal := reflect.ValueOf(dest).Elem()

	for i := 0; i < destVal.NumField(); i++ {
		field := destVal.Type().Field(i)
		srcField := srcVal.FieldByName(field.Name)
		if srcField.IsValid() {
			destVal.Field(i).Set(srcField)
		}
	}
}
