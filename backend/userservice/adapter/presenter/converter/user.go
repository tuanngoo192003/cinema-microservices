package converter

import (
	"strconv"
	"user-service/usecase"

	"github.com/gin-gonic/gin"
	"github.com/tuanngoo192003/golang-utils/utils"
)

func ToGetAllUsersInputType(c *gin.Context) (*usecase.GetAllUsersRequest, error) {
	var (
		page, perpage int
		search        string
		err           error
	)
	search = c.Query("search")

	page, err = strconv.Atoi(c.Query("page"))
	if err != nil || page <= 0 {
		page = utils.DEFAULT_PAGE
	}
	perpage, err = strconv.Atoi(c.Query("perpage"))
	if err != nil || perpage <= 0 {
		perpage = utils.DEFAULT_PAGE
	}

	return &usecase.GetAllUsersRequest{
		Page:    page,
		Perpage: perpage,
		Search:  search,
	}, err
}

func ToGetUserByIDInputType(c *gin.Context) (*usecase.GetUserByIDRequest, error) {
	return &usecase.GetUserByIDRequest{
		UserID: c.Param("id"),
	}, nil
}

func ToUpdateUserInputType(c *gin.Context) (*usecase.UpdateUserRequest, error) {
	var input usecase.UpdateUserRequest
	if err := c.ShouldBindJSON(&input); err != nil {
		return &usecase.UpdateUserRequest{}, err
	}
	return &input, nil
}

func ToCreateUserInputType(c *gin.Context) (*usecase.CreateUserRequest, error) {
	var input usecase.CreateUserRequest
	if err := c.ShouldBindJSON(&input); err != nil {
		return &usecase.CreateUserRequest{}, err
	}
	return &input, nil
}

func ToIsUserExistInputType(c *gin.Context) (*usecase.IsUserExistRequest, error) {
	return &usecase.IsUserExistRequest{
		UserID: c.Param("id"),
	}, nil
}
