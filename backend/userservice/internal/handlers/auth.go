package handlers

import (
	"bytes"
	"database/sql"
	"net/http"
	"time"
	"user-service/infra/config"
	"user-service/infra/database"
	"user-service/internal/domain/entity"
	"user-service/internal/handlers/payload"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/tuanngoo192003/golang-utils/utils"
)

type RefreshTokenRequest struct {
	RefreshToken string `json:"refreshToken"`
}

type AuthHandler struct {
    db *database.Database
    jwtSecret []byte 
    tokenExpiration time.Duration
}

func NewAuthHandler(db *database.Database, jwtSecret string) *AuthHandler {
    return &AuthHandler{
        db: db,
        jwtSecret: []byte(jwtSecret),
        tokenExpiration: time.Hour * 24,
    }
}

func (h *AuthHandler) GetDB() *database.Database {
    return h.db
} 

func (h *AuthHandler) Login(c *gin.Context) {
	//Zap logger 	
	log := config.GetLogger()

	var login payload.LoginRequest 

    err := c.ShouldBindJSON(&login); 
    if err != nil {
		log.Error(err.Error())
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return 
    }

    var user entity.User
	getCredential(&user, h, login, c) 

    if !utils.CheckPasswordHash(login.Password, user.Password) {
        log.Error("Invalid credential")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid credential"})
        return 
    }

    /* Generate JWT token with claims */
    now := time.Now()
	jwt.WithSubject(user.Username)
    claims := jwt.MapClaims {
		"username": user.Username,
        "roles": []interface{}{user.Roles.RoleName},
        "iat": now.Unix(),
        "exp": now.Add(h.tokenExpiration).Unix(),
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString(h.jwtSecret)
    if err != nil {
		log.Error("Token generation failed")
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Token generation failed"})
        return     
    }

	refreshTokenString := uuid.New().String()
	saveRefreshToken(h, c, refreshTokenString, user.Username, string(user.Roles.RoleName))

    c.JSON(http.StatusOK, gin.H{
		"id": user.UserID, 
		"username": user.Username,
        "role": user.Roles.RoleName,
        "accessToken": tokenString,
		"refreshToken": refreshTokenString,
		"expires_in": h.tokenExpiration.Seconds(),
        "token_type": "Bearer",
    })
}

func getCredential(user *entity.User, h *AuthHandler, login payload.LoginRequest, c *gin.Context) {
	log := config.GetLogger()
    var err error  
    if utils.IsEmail(user.Email){
        err = h.db.GORM.First(&user, "email = ?", login.Identifier).Preload("Roles").Find(&user).Error
        if err != nil {
			log.Error(err.Error())
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return 
        }
    } else {
        err = h.db.GORM.Model(entity.User{}).Where("username = ?", login.Identifier).Preload("Roles").Find(&user).Error
        if err != nil {
			log.Error(err.Error())
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
    }
  
    if err == sql.ErrNoRows {
		log.Error("Invalid credential")
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credential"})
        return
    }
    if err != nil {
        var temp bytes.Buffer
        temp.WriteString("Login processfailed: ")
        temp.WriteString(err.Error())
		log.Error(temp.String())
        c.JSON(http.StatusInternalServerError, gin.H{"error": temp.String()})
        return 
    }
}

func (h *AuthHandler) RefreshToken (c *gin.Context) {
	log := config.GetLogger()
	
    /* Get userId from context set by auth middleware */
    username, exists := c.Get("username")
    if !exists {
		log.Error("User not authenticated")
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
        return 
    }

	var refreshToken RefreshTokenRequest
	if err := c.ShouldBindJSON(&refreshToken); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": err.Error()}})
		return
	}
    
    now := time.Now() 
    
	var token entity.RefreshToken
    err := h.db.GORM.Model(entity.RefreshToken{}).Where("username = ?", username).Find(&token).Error
    if err != nil {
		log.Error(err.Error())
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return 
    }
	jwt.WithSubject(token.Username)
    claims := jwt.MapClaims {
        "roles": []interface{}{token.RoleName},
        "iat": now.Unix(),
        "exp": now.Add(h.tokenExpiration).Unix(),
    }

	newToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := newToken.SignedString(h.jwtSecret)
    if err != nil {
		log.Error("Token generation failed")
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Token generation failed"})
        return 
    }

    c.JSON(http.StatusOK, gin.H{
        "token": tokenString,
        "expires_in": h.tokenExpiration.Seconds(),
        "token_type": "Bearer",
    })
}

func saveRefreshToken(h *AuthHandler, c *gin.Context, refreshTokenString string, username string, roleName string){	
	log := config.GetLogger()

	tx, err := h.db.DB.Begin()
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
		return
	}

	defer func(){
		if r := recover(); r != nil {
			tx.Rollback()
			log.Error("Transaction failed")
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction failed"})
		}
	}()

	if _, err := tx.Exec(`DELETE FROM refresh_tokens WHERE username = $1`, username); err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": err.Error()}})	
		return
	}

	expiredAt := time.Now().Add(time.Duration(h.tokenExpiration.Seconds())).Format("2006-01-02 15:04:05")
	var id uint64
	if err := tx.QueryRow(`
		INSERT INTO refresh_tokens (username, token, expired_at, role_name)
		VALUES ($1, $2, $3, $4) RETURNING token_id
		`, username, refreshTokenString, expiredAt, roleName).Scan(&id); err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": err.Error()}})	
		return
	}

	if err := tx.Commit(); err != nil {
		log.Error("Failed to commit transaction")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}
}





