package writer

import (
	"net/http"
	"user-service/usecase"

	"github.com/gin-gonic/gin"
)

func ToGetAllUsersOutputType(c *gin.Context, output *usecase.GetAllUsersResponse) {
	c.JSON(http.StatusOK, output)
}

func ToGetUserByIDOutputType(c *gin.Context, output *usecase.GetUserByIDResponse) {
	c.JSON(http.StatusOK, output)
}

func ToUpdateUserOutputType(c *gin.Context, output *usecase.UpdateUserResponse) {
	c.JSON(http.StatusOK, output)
}

func ToCreateUserOutputType(c *gin.Context, output *usecase.CreateUserResponse) {
	c.JSON(http.StatusOK, output)
}

func ToIsUserExistOutputType(c *gin.Context, output *usecase.IsUserExistResponse) {
	c.JSON(http.StatusOK, output)
}
