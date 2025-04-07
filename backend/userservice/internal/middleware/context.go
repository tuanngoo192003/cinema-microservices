package middleware

import (
	"net/http"
	"strings"
	"time"
	"user-service/infra/config"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/time/rate"
)

func ContextMiddleware(jwtSecret []byte) gin.HandlerFunc {
   return func(c *gin.Context){
		log := config.GetLogger()

		/* Get authorization header */
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
			log.Error("Authorization header missing") 
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
            c.Abort() 
            return 
        }
        
		/* Check bearer scheme */
        parts := strings.Split(authHeader, " ")
        if len(parts) != 2 || parts[0] != "Bearer" {
			log.Error("Invalid authorization")
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization"})
            c.Abort()
            return 
        }

        tokenString := parts[1]
        
        token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
            if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, jwt.ErrSignatureInvalid
            }
            return jwtSecret, nil 
        })

        if err != nil {
            if err == jwt.ErrSignatureInvalid {
				log.Error("Invalidtoken string")
                c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token string"})
            } else {
				log.Error("Token invalid or expired")
                c.JSON(http.StatusUnauthorized, gin.H{"error": "Token invalid or expired"})
            }
            c.Abort()
            return
        }

		
		claims, ok := token.Claims.(jwt.MapClaims)
        if !ok || !token.Valid {
			log.Error("Invalid token claims")
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"}) 
            c.Abort()
            return
        }

    	log.Info("Current user: ", claims["username"])
        c.Set("username", claims["username"])

        c.Next()
    } 
}

func RateLimiter() gin.HandlerFunc {
    limiter := rate.NewLimiter(rate.Every(time.Second), 10)
    return func(ctx *gin.Context) {
        if !limiter.Allow() {
            ctx.JSON(http.StatusTooManyRequests, gin.H{"error": "Too many request"})
            ctx.Abort()
            return 
        }
        ctx.Next()
    }
}
