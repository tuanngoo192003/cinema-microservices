package controller

import (
	"user-service/adapter/presenter"
	"user-service/domain/repo"
	"user-service/infra/config"
	"user-service/infra/database"
	"user-service/infra/middleware"
	"user-service/usecase/interactor"

	"github.com/gin-gonic/gin"
)

func NewAuthController(r *gin.Engine, cfg *config.Config, db *database.Database, jwtSecret string) {
	authRepo := repo.NewAuthRepository(db)

	// 2. Initialize usecase (interactor)
	authUsecase := interactor.NewAuthInteractor(authRepo, jwtSecret)

	// 3. Initialize presenter (controller adapter)
	authPresenter := presenter.NewAuthPresenter(authUsecase)

	// 4. Register routes
	protected := r.Group("/")
	{
		protected.POST("refresh", middleware.ContextMiddleware([]byte(cfg.JWT.Secret)), authPresenter.RefreshToken())
		protected.POST("login", authPresenter.Login())
	}
}
