package controller

import (
	"user-service/adapter/presenter"
	"user-service/domain/repo"
	"user-service/infra/client"
	"user-service/infra/config"
	"user-service/infra/database"
	"user-service/usecase/interactor"

	"github.com/gin-gonic/gin"
)

func NewUserController(r *gin.Engine, cfg *config.Config, db *database.Database) {
	// 1. Initialize repository
	userRepo := repo.NewUserRepository(db)

	// 2. Initialize usecase (interactor)
	userUsecase := interactor.NewUserInteractor(userRepo)

	// 3. Initialize presenter (controller adapter)
	userPresenter := presenter.NewUserPresenter(userUsecase)

	// 4. Register routes
	protected := r.Group("/users")
	{
		protected.GET("/:id", userPresenter.GetUserById())
		protected.GET("", userPresenter.GetAllUsers())
		protected.POST("", userPresenter.CreateUser())
		protected.PUT("", userPresenter.UpdateUser())
		protected.GET("existed/:id", userPresenter.IsUserExist())
		protected.GET("userservice/cinema/health", client.CinemaServiceHealthCheck)
		protected.POST("register", userPresenter.CreateUser())

	}
}
