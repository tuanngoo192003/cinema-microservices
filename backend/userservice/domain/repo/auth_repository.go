package repo

import (
	"user-service/domain/entity"
	"user-service/domain/repo/impl"
	"user-service/infra/database"
)

type AuthRepository interface {
	GetUserByUsername(username string) (user entity.User, err error)
	GetUserByEmail(email string) (user entity.User, err error)
	SaveRefreshToken(refreshTokenString string, username string, roleName string) (err error)
	GetRefreshToken(username string) (refreshToken entity.RefreshToken, err error)
}

func NewAuthRepository(db *database.Database) AuthRepository {
	return impl.NewAuthRepositoryImpl(db)
}
