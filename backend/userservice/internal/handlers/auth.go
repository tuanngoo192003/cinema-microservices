package handlers

import (
	"bytes"
	"database/sql"
	"net/http"
	"time"
	"user-service/internal/config"
	"user-service/internal/database"
	"user-service/internal/models"

	"github.com/tuanngoo192003/golang-utils/utils"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

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

	var login models.LoginRequest 

    err := c.ShouldBindJSON(&login); 
    if err != nil {
		log.Error(err.Error())
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return 
    }

    var user models.User
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

    c.JSON(http.StatusOK, gin.H{
        "username": user.Username,
        "role_id": user.Roles.RoleID,
        "token": tokenString,
        "expires_in": h.tokenExpiration.Seconds(),
        "token_type": "Bearer",
    })
}

func getCredential(user *models.User, h *AuthHandler, login models.LoginRequest, c *gin.Context) {
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
        err = h.db.GORM.Model(models.User{}).Where("username = ?", login.Identifier).Preload("Roles").Find(&user).Error
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
    userID, exists := c.Get("user_id")
    if !exists {
		log.Error("User not authenticated")
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
        return 
    }
    
    now := time.Now()
    var ( 
        username string
        roleID uint
    ) 
     
    err := h.db.GORM.Select("role_id", "username").Where("userID = ?", userID).First(&roleID, &username).Error
    if err != nil {
		log.Error(err.Error())
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return 
    }
    claims := jwt.MapClaims {
        "username": username,
        "role_id": roleID,
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

    c.JSON(http.StatusOK, gin.H{
        "token": tokenString,
        "expires_in": h.tokenExpiration.Seconds(),
        "token_type": "Bearer",
    })
}

