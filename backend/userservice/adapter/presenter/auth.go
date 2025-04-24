package presenter

import (
	"user-service/adapter/presenter/converter"
	"user-service/adapter/presenter/writer"
	"user-service/common"
	"user-service/usecase"

	"github.com/gin-gonic/gin"
)

type AuthPresenter interface {
}

type AuthPresenterImpl struct {
	usecase usecase.AuthUsecase
}

func NewAuthPresenter(usecase usecase.AuthUsecase) *AuthPresenterImpl {
	return &AuthPresenterImpl{
		usecase: usecase,
	}
}

func (ap *AuthPresenterImpl) Login() gin.HandlerFunc {
	return common.InvokeUseCase(
		converter.ToLoginInputType,
		ap.usecase.Login,
		writer.ToLoginOutputType,
	)
}

func (ap *AuthPresenterImpl) RefreshToken() gin.HandlerFunc {
	return common.InvokeUseCase(
		converter.ToRefreshTokenInputType,
		ap.usecase.RefreshToken,
		writer.ToRefreshTokenOutputType,
	)
}
