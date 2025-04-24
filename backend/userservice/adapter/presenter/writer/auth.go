package writer

import (
	"net/http"
	"user-service/usecase"

	"github.com/gin-gonic/gin"
)

func ToLoginOutputType(c *gin.Context, output *usecase.LoginResponse) {
	c.JSON(http.StatusOK, output)
}

func ToRefreshTokenOutputType(c *gin.Context, output *usecase.RefreshTokenResponse) {
	c.JSON(http.StatusOK, output)
}
