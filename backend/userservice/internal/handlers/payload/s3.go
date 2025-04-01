package payload

import "mime/multipart"

type UploadFileRequest struct {
	Image *multipart.FileHeader `form:"image"`
}

type UploadFileResponse struct {
	Url string `json:"imageUrl"`
}
