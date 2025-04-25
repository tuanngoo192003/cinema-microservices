package controller

import (
	"user-service/adapter/presenter"

	"github.com/gin-gonic/gin"
)

func NewS3Controller(r *gin.Engine) {

	// 4. Register routes
	protected := r.Group("/upload")
	{
		protected.POST("", presenter.UploadFile)
	}
}
