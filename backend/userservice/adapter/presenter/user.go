package presenter

import (
	"user-service/adapter/presenter/converter"
	"user-service/adapter/presenter/writer"
	"user-service/common"
	"user-service/usecase"

	"github.com/gin-gonic/gin"
)

type UserPresenter interface {
}

type UserPresenterImpl struct {
	usecase usecase.UserUsecase
}

func NewUserPresenter(usecase usecase.UserUsecase) *UserPresenterImpl {
	return &UserPresenterImpl{
		usecase: usecase,
	}
}

func (up *UserPresenterImpl) GetAllUsers() gin.HandlerFunc {
	return common.InvokeUseCase(
		converter.ToGetAllUsersInputType,
		up.usecase.GetAllUsers,
		writer.ToGetAllUsersOutputType,
	)
}

func (up *UserPresenterImpl) GetUserById() gin.HandlerFunc {
	return common.InvokeUseCase(
		converter.ToGetUserByIDInputType,
		up.usecase.GetUserById,
		writer.ToGetUserByIDOutputType,
	)
}

func (up *UserPresenterImpl) UpdateUser() gin.HandlerFunc {
	return common.InvokeUseCase(
		converter.ToUpdateUserInputType,
		up.usecase.UpdateUser,
		writer.ToUpdateUserOutputType,
	)
}

func (up *UserPresenterImpl) CreateUser() gin.HandlerFunc {
	return common.InvokeUseCase(
		converter.ToCreateUserInputType,
		up.usecase.CreateUser,
		writer.ToCreateUserOutputType,
	)
}

func (up *UserPresenterImpl) IsUserExist() gin.HandlerFunc {
	return common.InvokeUseCase(
		converter.ToIsUserExistInputType,
		up.usecase.IsUserExist,
		writer.ToIsUserExistOutputType,
	)
}
