package interactor

import (
	"context"
	"user-service/common"
	"user-service/domain/entity"
	"user-service/domain/repo"
	"user-service/infra/config"
	"user-service/usecase"

	"github.com/tuanngoo192003/golang-utils/utils"
)

type UserInteractor struct {
	repository repo.UserRepository
}

func NewUserInteractor(repository repo.UserRepository) *UserInteractor {
	return &UserInteractor{
		repository: repository,
	}
}

func (ui *UserInteractor) GetAllUsers(ctx context.Context, input *usecase.GetAllUsersRequest) (output *usecase.GetAllUsersResponse, err error) {
	log := config.GetLogger()

	/* count total records */
	var count int64
	count, err = ui.repository.CountAllUsers(input.Search)
	if err != nil {
		log.Error(err.Error())
		return &usecase.GetAllUsersResponse{}, err
	}

	offset := utils.GetOffset(input.Page, &input.Perpage)
	totalPage := int64(utils.GetTotalPage(float32(count), &input.Perpage))

	/* get user list */
	data, err := ui.repository.GetAllUsers(input.Search, offset, input.Perpage)
	if err != nil {
		log.Error(err.Error())
		return &usecase.GetAllUsersResponse{}, err
	}

	var computedData []usecase.GetAllUsersData
	for _, v := range data {
		userRsp := usecase.GetAllUsersData{
			UserID:      v.UserID,
			FirstName:   v.FirstName,
			LastName:    v.LastName,
			Email:       v.Email,
			DateOfBirth: v.DateOfBirth,
			PhoneNumber: v.PhoneNumber,
			RoleName:    string(v.Roles.RoleName),
			Avatar:      v.Avatar,
		}
		computedData = append(computedData, userRsp)
	}
	return &usecase.GetAllUsersResponse{
		Resp: common.PaginationResponse[usecase.GetAllUsersData]{
			Page:        input.Page,
			Perpage:     input.Perpage,
			Data:        computedData,
			TotalRecord: count,
			TotalPage:   int64(totalPage),
		},
	}, nil
}

func (ui *UserInteractor) GetUserById(ctx context.Context, input *usecase.GetUserByIDRequest) (output *usecase.GetUserByIDResponse, err error) {
	log := config.GetLogger()

	user, err := ui.repository.GetUserById(input.UserID)
	if err != nil {
		log.Error(err.Error())
		return &usecase.GetUserByIDResponse{}, err
	}

	return &usecase.GetUserByIDResponse{
		UserID:      user.UserID,
		FirstName:   user.FirstName,
		LastName:    user.LastName,
		Email:       user.Email,
		DateOfBirth: user.DateOfBirth,
		PhoneNumber: user.PhoneNumber,
		RoleName:    string(user.Roles.RoleName),
		Avatar:      user.Avatar,
	}, nil
}

func (ui *UserInteractor) UpdateUser(ctx context.Context, input *usecase.UpdateUserRequest) (output *usecase.UpdateUserResponse, err error) {
	log := config.GetLogger()

	userEntity := entity.User{
		Avatar:      input.Avatar,
		Email:       input.Email,
		Status:      input.Status,
		FirstName:   input.FirstName,
		LastName:    input.LastName,
		PhoneNumber: input.PhoneNumber,
		DateOfBirth: input.DateOfBirth,
		IsDeleted:   input.IsDeleted,
	}
	userEntity, err = ui.repository.UpdateUser(userEntity)
	if err != nil {
		log.Error(err.Error())
		return &usecase.UpdateUserResponse{}, err
	}

	return &usecase.UpdateUserResponse{
		UserID:      userEntity.UserID,
		FirstName:   userEntity.FirstName,
		LastName:    userEntity.LastName,
		Email:       userEntity.Email,
		DateOfBirth: userEntity.DateOfBirth,
		PhoneNumber: userEntity.PhoneNumber,
		RoleName:    string(userEntity.Roles.RoleName),
		Avatar:      userEntity.Avatar,
	}, nil
}

func (ui *UserInteractor) CreateUser(ctx context.Context, input *usecase.CreateUserRequest) (output *usecase.CreateUserResponse, err error) {
	log := config.GetLogger()

	userEntity := entity.User{
		Username:    input.Username,
		Password:    input.Password,
		Status:      input.Status,
		Email:       input.Email,
		FirstName:   input.FirstName,
		LastName:    input.LastName,
		DateOfBirth: input.DateOfBirth,
		PhoneNumber: input.PhoneNumber,
		RoleID:      input.RoleID,
	}
	userEntity, err = ui.repository.UpdateUser(userEntity)
	if err != nil {
		log.Error(err.Error())
		return &usecase.CreateUserResponse{}, err
	}

	return &usecase.CreateUserResponse{
		UserID:      userEntity.UserID,
		Username:    userEntity.Username,
		FirstName:   userEntity.FirstName,
		LastName:    userEntity.LastName,
		Email:       userEntity.Email,
		DateOfBirth: userEntity.DateOfBirth,
		PhoneNumber: userEntity.PhoneNumber,
		RoleName:    string(userEntity.Roles.RoleName),
		Avatar:      userEntity.Avatar,
	}, nil
}

func (ui *UserInteractor) IsUserExist(ctx context.Context, input *usecase.IsUserExistRequest) (output *usecase.IsUserExistResponse, err error) {
	log := config.GetLogger()
	var username string
	username, err = ui.repository.IsUserExist(input.UserID)
	if err != nil {
		log.Error(err.Error())
		return &usecase.IsUserExistResponse{
			Existed: false,
		}, err
	}
	if username == "" {
		return &usecase.IsUserExistResponse{
			Existed: false,
		}, err
	}
	return &usecase.IsUserExistResponse{
		Existed: true,
	}, nil
}
