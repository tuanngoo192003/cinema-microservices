package middleware

import (
	"booking-service/common"
	"booking-service/components/appctx"
	"errors"
	"fmt"

	"github.com/gin-gonic/gin"
)

func Recover(appContext appctx.AppContext) gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if r := recover(); r != nil {
				c.Header("Content-Type", "application/json")

				var appErr *common.AppError
				err, ok := r.(error)
				if !ok {
					err = fmt.Errorf("%v", r)
				}

				if errors.As(err, &appErr) {
					c.AbortWithStatusJSON(appErr.StatusCode, appErr)
				} else {
					appErr = common.ErrInternal(err)
					c.AbortWithStatusJSON(appErr.StatusCode, appErr)
				}
			}
		}()

		c.Next()
	}
}
