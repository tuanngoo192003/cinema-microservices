package impl

import (
	"user-service/domain/entity"
	"user-service/infra/database"

	"github.com/tuanngoo192003/golang-utils/utils"
)

type UserRepositoryImpl struct {
	db *database.Database
}

func NewUserRepositoryImpl(db *database.Database) *UserRepositoryImpl {
	return &UserRepositoryImpl{
		db: db,
	}
}

func (i *UserRepositoryImpl) CountAllUsers(search string) (count int64, err error) {
	dbQuery := i.db.GORM.Model(entity.User{})
	if search == "" {
		dbQuery.Where(`
			to_tsvector('english', username || ' ' || email) @@ plainto_tsquery('english', CAST( ? AS TEXT))
			`, search)
	}

	err = dbQuery.Count(&count).Error
	return
}

func (i *UserRepositoryImpl) GetAllUsers(search string, offset int, limit int) (users []entity.User, err error) {
	dbQuery := i.db.GORM.Model(entity.User{})
	if search == "" {
		dbQuery.Where(`
			to_tsvector('english', username || ' ' || email) @@ plainto_tsquery('english', CAST( ? AS TEXT))
			`, search)
	}

	err = dbQuery.Model(&entity.User{}).
		Select(`users.user_id, users.email, users.status, users.first_name, users.last_name, 
				users.date_of_birth, users.phone_number, users.avatar, roles.role_name`).
		Joins("left join roles on roles.role_id = users.role_id").
		Offset(offset).
		Limit(limit).
		Find(&users).Error

	return users, err
}

func (i *UserRepositoryImpl) GetUserById(id string) (user entity.User, err error) {
	err = i.db.GORM.Where(`user_id = ? `, id).Preload("Roles").Find(&user).Error
	return user, err
}

func (i *UserRepositoryImpl) UpdateUser(user entity.User) (userRsp entity.User, err error) {
	tx, err := i.db.DB.Begin()
	if err != nil {
		return entity.User{}, err
	}

	defer func() {
		if err := recover(); err != nil {
			tx.Rollback()
			return
		}
	}()

	if user.Avatar != "" {
		userRsp.Avatar = user.Avatar
	}
	if user.Email != "" {
		userRsp.Email = user.Email
	}
	if user.Status != "" {
		userRsp.Status = user.Status
	}
	if user.FirstName != "" {
		userRsp.FirstName = user.FirstName
	}
	if user.LastName != "" {
		userRsp.LastName = user.LastName
	}
	if user.PhoneNumber != "" {
		userRsp.PhoneNumber = user.PhoneNumber
	}
	if user.DateOfBirth != "" {
		userRsp.DateOfBirth = user.DateOfBirth
	}
	if user.IsDeleted {
		userRsp.IsDeleted = user.IsDeleted
	}

	if err = i.db.GORM.Model(entity.User{}).Where(`user_id = ?`, user.UserID).Updates(&userRsp).Error; err != nil {
		return entity.User{}, err
	}

	if err = tx.Commit(); err != nil {
		return entity.User{}, err
	}

	return
}

func (i *UserRepositoryImpl) CreateUser(user entity.User) (userRsp entity.User, err error) {
	tx, err := i.db.DB.Begin()
	if err != nil {
		return entity.User{}, err
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			return
		}
	}()

	var id int64
	passwordHashed, err := utils.HashPassword(user.Password)
	if err != nil {
		tx.Rollback()
		return entity.User{}, err
	}

	if err := tx.QueryRow(`
		INSERT INTO users(username, password, status, email, first_name, last_name, date_of_birth, phone_number, role_id)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING user_id	
		`, user.Username, passwordHashed, user.Status, user.Email, user.FirstName, user.LastName, user.DateOfBirth, user.PhoneNumber, user.RoleID).
		Scan(&id); err != nil {
		return entity.User{}, err
	}

	if err := tx.Commit(); err != nil {
		return entity.User{}, err
	}
	return
}

func (i *UserRepositoryImpl) IsUserExist(userID string) (username string, err error) {
	if err = i.db.GORM.
		Model(entity.User{}).Select("username").Where("user_id = ?", userID).First(&username).Error; err != nil {
		return username, err
	}
	return
}
