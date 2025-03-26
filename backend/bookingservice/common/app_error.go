package common

import (
	"errors"
	"fmt"
	"net/http"
	"strings"
)

type AppError struct {
	StatusCode int    `json:"status_code"`
	RootErr    error  `json:"-"`
	Message    string `json:"message"`
	Log        string `json:"log"`
	Key        string `json:"error_key"`
}

func NewFullErrorResponse(statusCode int, root error, msg, log, key string) *AppError {
	return &AppError{
		StatusCode: statusCode,
		RootErr:    root,
		Message:    msg,
		Log:        log,
		Key:        key,
	}
}

func NewErrorResponse(root error, msg, log, key string) *AppError {
	return &AppError{
		StatusCode: http.StatusBadRequest,
		RootErr:    root,
		Message:    msg,
		Log:        log,
		Key:        key,
	}
}

func NewUnauthorized(root error, msg, log, key string) *AppError {
	return &AppError{
		StatusCode: http.StatusUnauthorized,
		RootErr:    root,
		Message:    msg,
		Log:        log,
		Key:        key,
	}
}

func NewCustomError(root error, msg, key string) *AppError {
	if root == nil {
		return NewErrorResponse(root, msg, msg, key)
	}

	return NewErrorResponse(errors.New(msg), msg, msg, key)
}

func (e *AppError) RootError() error {
	if e.RootErr == nil {
		return e
	}

	var err *AppError
	if errors.As(e.RootErr, &err) {
		return err.RootError()
	}
	return e.RootErr
}

func (e *AppError) Error() string {
	return e.RootError().Error()
}

func ErrDb(err error) *AppError {
	return NewErrorResponse(err, "something went wrong with Db", err.Error(), "DB_ERROR")
}

func ErrInValidRequest(err error) *AppError {
	return NewErrorResponse(err, "invalid request", err.Error(), "ErrInvalidRequest")
}

func ErrInternal(err error) *AppError {
	return NewFullErrorResponse(http.StatusInternalServerError, err, "something went wrong in the server",
		err.Error(), "ErrInternal")
}

func ErrCannotListEntity(entity string, err error) *AppError {
	return NewCustomError(
		err,
		fmt.Sprintf("Cannot list %s", strings.ToLower(entity)),
		fmt.Sprintf("ErrCannotListEntity %s", entity),
	)
}

func ErrCannotDeleteEntity(entity string, err error) *AppError {
	return NewCustomError(
		err,
		fmt.Sprintf("Cannot delete %s", strings.ToLower(entity)),
		fmt.Sprintf("ErrDeleteEntity %s", entity),
	)
}

func ErrCannotUpdateEntity(entity string, err error) *AppError {
	return NewCustomError(
		err,
		fmt.Sprintf("Cannot update %s", strings.ToLower(entity)),
		fmt.Sprintf("ErrUpdateEntity %s", entity),
	)
}

func ErrCannotCreateEntity(entity string, err error) *AppError {
	return NewCustomError(
		err,
		fmt.Sprintf("Cannot update %s", strings.ToLower(entity)),
		fmt.Sprintf("ErrCreateEntity %s", entity),
	)
}

func ErrEntityDeleted(entity string) *AppError {
	return NewCustomError(
		nil,
		fmt.Sprintf("Entity %s was deleted", strings.ToLower(entity)),
		fmt.Sprintf("ErrEntityDeleted %s", entity),
	)
}

func ErrInValidParam(param string) *AppError {
	return NewCustomError(
		nil,
		fmt.Sprintf("Param %s is not valid", strings.ToLower(param)),
		fmt.Sprintf("ErrInValidParam %s", param),
	)
}

func ErrRecordNotFound(entity string) *AppError {
	return NewCustomError(
		nil,
		fmt.Sprintf("Entity %s is not found", strings.ToLower(entity)),
		fmt.Sprintf("ErrRecordNotFound %s", entity),
	)
}

var (
	RecordNotFound = errors.New("record not found")
)
