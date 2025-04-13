package handlers

import (
	"cinema-service/infra/config"
	"cinema-service/internal/domain/entity"
	"cinema-service/internal/handlers/payload"
	"cinema-service/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ReservedSeatHandler struct {
	useCase *usecase.ReservedSeatUseCase
}

func NewReservedSeatHandler(useCase *usecase.ReservedSeatUseCase) *ReservedSeatHandler {
	return &ReservedSeatHandler{useCase}
}

func (h *ReservedSeatHandler) Remove(c *gin.Context) {
	log := config.GetLogger()

	id := c.Param("id")
	if id == "" {
		log.Info("ReservedSeat id is not found!")
		c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": "ReservedSeat id is not found!"}})
		return
	}

	idNumber, err := strconv.Atoi(id)
	if err != nil {
		log.Info(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": err.Error()}})
		return
	}

	err = h.useCase.Remove(uint(idNumber))
	if err != nil {
		log.Info(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": err.Error()}})
		return
	}
}

func (h *ReservedSeatHandler) Search(c *gin.Context) {
	log := config.GetLogger()

	var req payload.ReservedSeatSearchRequest
	err := c.ShouldBindQuery(&req)

	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	usecaseResponse, err := h.useCase.Search(req)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var response payload.ReservedSeatReponse
	payload.MapStruct(usecaseResponse, &response)

	c.JSON(http.StatusOK, gin.H{"data": response})
}

func (h *ReservedSeatHandler) Create(c *gin.Context) {
	log := config.GetLogger()
	var req payload.ReservedSeatRequest
	err := c.ShouldBindJSON(&req)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	obj := entity.ReservedSeat{}
	payload.MapStruct(req, &obj)
	result, err := h.useCase.Create(obj)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var response payload.ReservedSeatReponse
	payload.MapStruct(result, &response)

	log.Info("Created new reserved seat: ", response)
	c.JSON(http.StatusOK, gin.H{"data": response})
}
