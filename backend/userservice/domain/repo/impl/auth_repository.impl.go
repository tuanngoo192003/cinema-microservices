package impl

import (
	"database/sql"
	"time"
	"user-service/common"
	"user-service/domain/entity"
	"user-service/infra/config"
	"user-service/infra/database"
)

type AuthRepositoryImpl struct {
	db *database.Database
}

func NewAuthRepositoryImpl(db *database.Database) *AuthRepositoryImpl {
	return &AuthRepositoryImpl{
		db: db,
	}
}

func (ar *AuthRepositoryImpl) GetUserByUsername(username string) (user entity.User, err error) {
	log := config.GetLogger()

	err = ar.db.GORM.Model(entity.User{}).Where("username = ?", username).Preload("Roles").Find(&user).Error
	if err != nil {
		log.Error(err.Error())
		return entity.User{}, err
	}

	return user, nil
}

func (ar *AuthRepositoryImpl) GetUserByEmail(email string) (user entity.User, err error) {
	log := config.GetLogger()

	err = ar.db.GORM.First(&user, "email = ?", email).Preload("Roles").Find(&user).Error
	if err != nil {
		log.Error(err.Error())
		return entity.User{}, err
	}

	return user, nil
}

func (ar *AuthRepositoryImpl) SaveRefreshToken(refreshTokenString string, username string, roleName string) (err error) {
	log := config.GetLogger()

	_, err = common.Transaction[*entity.RefreshToken](ar.db, func(tx *sql.Tx) (*entity.RefreshToken, error) {
		if _, err := tx.Exec(`DELETE FROM refresh_tokens WHERE username = $1`, username); err != nil {
			log.Error(err.Error())
			return nil, err
		}

		expiredAt := time.Now().Add(time.Hour).Format("2006-01-02 15:04:05")
		var id uint
		if err := tx.QueryRow(`
			INSERT INTO refresh_tokens (username, token, expired_at, role_name)
			VALUES ($1, $2, $3, $4) RETURNING token_id
			`, username, refreshTokenString, expiredAt, roleName).Scan(&id); err != nil {
			log.Error(err.Error())
			return nil, err
		}

		return &entity.RefreshToken{TokenID: id}, nil
	})
	if err != nil {
		log.Error(err.Error())
		return err
	}
	return nil
}

func (ar *AuthRepositoryImpl) GetRefreshToken(username string) (refreshToken entity.RefreshToken, err error) {
	log := config.GetLogger()

	err = ar.db.GORM.Model(entity.RefreshToken{}).Where("username = ?", username).Find(&refreshToken).Error
	if err != nil {
		log.Error(err.Error())
		return entity.RefreshToken{}, err
	}

	return refreshToken, nil
}
