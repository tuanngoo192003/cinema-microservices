package usecase

import (
	"context"
	"user-service/common"
)

type UserUsecase interface {
	GetAllUsers(ctx context.Context, input *GetAllUsersRequest) (output *GetAllUsersResponse, err error)
	GetUserById(ctx context.Context, input *GetUserByIDRequest) (output *GetUserByIDResponse, err error)
	UpdateUser(ctx context.Context, input *UpdateUserRequest) (output *UpdateUserResponse, err error)
	CreateUser(ctx context.Context, input *CreateUserRequest) (output *CreateUserResponse, err error)
	IsUserExist(ctx context.Context, input *IsUserExistRequest) (output *IsUserExistResponse, err error)
}

type (
	GetAllUsersRequest struct {
		Page    int
		Perpage int
		Search  string
	}
	GetAllUsersData struct {
		UserID      uint   `json:"id" binding:"required"`
		FirstName   string `json:"firstName"`
		LastName    string `json:"lastName"`
		Email       string `json:"email" binding:"email"`
		DateOfBirth string `json:"dateOfBirth"`
		PhoneNumber string `json:"phoneNumber"`
		RoleName    string `json:"role"`
		Avatar      string `json:"avatar"`
	}
	GetAllUsersResponse struct {
		Resp common.PaginationResponse[GetAllUsersData]
	}
)

type (
	GetUserByIDRequest struct {
		UserID string
	}
	GetUserByIDResponse struct {
		UserID      uint   `json:"id" binding:"required"`
		FirstName   string `json:"firstName"`
		LastName    string `json:"lastName"`
		Email       string `json:"email" binding:"email"`
		DateOfBirth string `json:"dateOfBirth"`
		PhoneNumber string `json:"phoneNumber"`
		RoleName    string `json:"role"`
		Avatar      string `json:"avatar"`
	}
)

type (
	CreateUserRequest struct {
		Username    string `json:"username" binding:"required"`
		Email       string `json:"email" binding:"required,email"`
		Status      string `json:"status" binding:"required"`
		Password    string `json:"password" binding:"required,min=6"`
		RoleID      uint   `json:"roleId" binding:"required"`
		FirstName   string `json:"first_name" binding:"required"`
		LastName    string `json:"last_name" binding:"required"`
		DateOfBirth string `json:"date_of_birth"`
		PhoneNumber string `json:"phone_number"`
	}
	CreateUserResponse struct {
		UserID      uint   `json:"userId" binding:"required"`
		Username    string `json:"username" binding:"required"`
		Email       string `json:"email" binding:"email"`
		Status      string `json:"status"`
		FirstName   string `json:"firstName"`
		LastName    string `json:"lastName"`
		DateOfBirth string `json:"dateOfBirth"`
		PhoneNumber string `json:"phoneNumber"`
		Avatar      string `json:"avatar"`
		RoleName    string `json:"roleName"`
	}
)

type (
	UpdateUserRequest struct {
		UserID      uint   `json:"userId" binding:"required"`
		Email       string `json:"email" binding:"email"`
		Status      string `json:"status"`
		FirstName   string `json:"firstName"`
		LastName    string `json:"lastName"`
		DateOfBirth string `json:"dateOfBirth"`
		PhoneNumber string `json:"phoneNumber"`
		Avatar      string `json:"avatar"`
		IsDeleted   bool   `json:"isDeleted"`
	}

	UpdateUserResponse struct {
		UserID      uint   `json:"userId" binding:"required"`
		Email       string `json:"email" binding:"email"`
		Status      string `json:"status"`
		FirstName   string `json:"firstName"`
		LastName    string `json:"lastName"`
		DateOfBirth string `json:"dateOfBirth"`
		PhoneNumber string `json:"phoneNumber"`
		Avatar      string `json:"avatar"`
		RoleName    string `json:"roleName"`
	}
)

type (
	IsUserExistRequest struct {
		UserID string
	}

	IsUserExistResponse struct {
		Existed bool `json:"existed"`
	}
)
