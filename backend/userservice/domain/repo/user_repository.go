package repo

import (
	"user-service/domain/entity"
	"user-service/domain/repo/impl"
	"user-service/infra/database"
)

type UserRepository interface {
	CountAllUsers(search string) (count int64, err error)
	GetAllUsers(search string, offset int, limit int) (users []entity.User, err error)
	GetUserById(id string) (user entity.User, err error)
	UpdateUser(user entity.User) (userRsp entity.User, err error)
	CreateUser(user entity.User) (userRsp entity.User, err error)
	IsUserExist(userID string) (username string, err error)
}

func NewUserRepository(db *database.Database) UserRepository {
	return impl.NewUserRepositoryImpl(db)
}
