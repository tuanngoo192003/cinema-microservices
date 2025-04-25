package interactor

import (
	"context"
	"database/sql"
	"errors"
	"time"
	"user-service/domain/entity"
	"user-service/domain/repo"
	"user-service/infra/config"
	"user-service/usecase"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/tuanngoo192003/golang-utils/utils"
)

type AuthInteractor struct {
	repository      repo.AuthRepository
	jwtSecret       []byte
	tokenExpiration time.Duration
}

func NewAuthInteractor(repository repo.AuthRepository, jwtSecret string) *AuthInteractor {
	return &AuthInteractor{
		repository:      repository,
		jwtSecret:       []byte(jwtSecret),
		tokenExpiration: time.Hour * 24,
	}
}

func (ai *AuthInteractor) Login(ctx context.Context, input *usecase.LoginRequest) (output *usecase.LoginResponse, err error) {
	log := config.GetLogger()

	user, err := getCredential(input, ai)
	if err != nil {
		return nil, err
	}
	if !utils.CheckPasswordHash(input.Password, user.Password) {
		log.Error("Invalid credential")
		return &usecase.LoginResponse{}, errors.New("Invalid credential")
	}

	/* Generate JWT token with claims */
	now := time.Now()
	jwt.WithSubject(user.Username)
	claims := jwt.MapClaims{
		"username": user.Username,
		"roles":    []interface{}{user.Roles.RoleName},
		"iat":      now.Unix(),
		"exp":      now.Add(ai.tokenExpiration).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(ai.jwtSecret)
	if err != nil {
		log.Error("Token generation failed")
		return &usecase.LoginResponse{}, errors.New("Token generation failed")
	}

	refreshTokenString := uuid.New().String()
	ai.repository.SaveRefreshToken(refreshTokenString, user.Username, string(user.Roles.RoleName))

	return &usecase.LoginResponse{
		ID:           user.UserID,
		Username:     user.Username,
		RoleName:     string(user.Roles.RoleName),
		Token:        tokenString,
		RefreshToken: refreshTokenString,
		ExpiresIn:    ai.tokenExpiration.Seconds(),
		TokenType:    "Bearer",
	}, nil
}

func getCredential(input *usecase.LoginRequest, ai *AuthInteractor) (user entity.User, err error) {
	if utils.IsEmail(user.Email) {
		user, err = ai.repository.GetUserByEmail(input.Identifier)
	} else {
		user, err = ai.repository.GetUserByUsername(input.Identifier)
	}

	if err == sql.ErrNoRows {
		return entity.User{}, err
	}
	if err != nil {
		return entity.User{}, err
	}
	return
}

func (ai *AuthInteractor) RefreshToken(ctx context.Context, input *usecase.RefreshTokenRequest) (output *usecase.RefreshTokenResponse, err error) {
	log := config.GetLogger()
	now := time.Now()

	var token entity.RefreshToken
	token, err = ai.repository.GetRefreshToken(input.Username)
	if err != nil {
		log.Error(err.Error())
		return &usecase.RefreshTokenResponse{}, err
	}
	jwt.WithSubject(token.Username)
	claims := jwt.MapClaims{
		"roles": []interface{}{token.RoleName},
		"iat":   now.Unix(),
		"exp":   now.Add(ai.tokenExpiration).Unix(),
	}

	newToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := newToken.SignedString(ai.jwtSecret)
	if err != nil {
		log.Error("Token generation failed")
		return &usecase.RefreshTokenResponse{}, errors.New("Token generation failed")
	}

	return &usecase.RefreshTokenResponse{
		Token:     tokenString,
		ExpiresIn: ai.tokenExpiration.Seconds(),
		TokenType: "Bearer",
	}, nil
}
