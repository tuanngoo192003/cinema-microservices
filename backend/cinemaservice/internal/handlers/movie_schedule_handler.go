package handlers

import (
	"cinema-service/infra/config"
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type MovieScheduleHander struct {
	db *gorm.DB
}

func NewMovieScheduleHandler(db *gorm.DB) *MovieScheduleHander {
	return &MovieScheduleHander{
		db: db,
	}
}

func (h *MovieScheduleHander) CreateMovieSchedule(c *gin.Context) {
	log := config.Newlogger(config.ConfigLogger{})
	var movieSchedule payload.MovieScheduleRequest

	if err := c.ShouldBindJSON(&movieSchedule); err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": err.Error()}})
		return
	}

	format := time.RFC3339
	startAtTime, err := time.Parse(movieSchedule.StartAt, format)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": err.Error()}})
		return
	}
	endAtTime, err := time.Parse(movieSchedule.EndAt, format)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": err.Error()}})
		return
	}
	movieScheduleEntity := entity.MovieSchedule{
		MovieID:        movieSchedule.MovieID,
		AuditoriumID:   movieSchedule.AuditoriumID,
		StartAt:        startAtTime,
		EndAt:          endAtTime,
		ScheduleStatus: movieSchedule.ScheduleStatus,
	}

	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{
		SkipDefaultTransaction: true,
	})
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{
			"error":   err.Error(),
			"message": "Failed to start sqlite",
		}})
		return
	}

	tx := db.Session(&gorm.Session{SkipDefaultTransaction: true})
	if err := tx.Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{
			"error":   err.Error(),
			"message": "Failed to open session",
		}})
		tx.Rollback()
		return
	}

	response := tx.Create(&movieScheduleEntity)
	if err := response.Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{
			"error":   err.Error(),
			"message": "Created movie schedule failed",
		}})
		tx.Rollback()
		return
	}

	seats := generateSeats(movieScheduleEntity.AuditoriumID)
	response = tx.Create(seats)
	if err := response.Error; err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{
			"error":   err.Error(),
			"message": "Created seats failed",
		}})
		tx.Rollback()
		return
	}

	tx.Commit()
	log.Info("Created movie schedule successfully!")
	c.JSON(http.StatusOK, gin.H{"data": movieScheduleEntity})
}

func generateSeats(auditoriumID uint) (seats []entity.Seat) {
	char := 'A'
	for i := 0; i < 10; i++ {
		for j := 1; j <= 12; j++ {
			seat := entity.Seat{
				AuthoriumID:   auditoriumID,
				CurrentStatus: "AVAILABLE",
				SeatCode:      fmt.Sprintf("%c%d", char, j),
			}
			seats = append(seats, seat)
		}
		char++ // Move to the next row (A → B → C → ... → J)
	}
	return seats
}

func (h *MovieScheduleHander) UpdateMovieSchedule(c *gin.Context) {

}

func (h *MovieScheduleHander) ListMovieSchedules(c *gin.Context) {

}

func (h *MovieScheduleHander) GetMovieSchedule(c *gin.Context) {

}
