package handlers

import (
	"cinema-service/infra/config"
	"cinema-service/internal/handlers/payload"
	"cinema-service/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ReservedSeatHandler struct {
	useCase *usecase.ReservedSeatUseCase
}

func NewReservedSeatHandler(useCase *usecase.ReservedSeatUseCase) *ReservedSeatHandler {
	return &ReservedSeatHandler{useCase}
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

	result, err := h.useCase.Create(req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var response payload.ReservedSeatReponse
	payload.MapStruct(result, &response)

	log.Info("Created new reserved seat: ", response)
	c.JSON(http.StatusOK, gin.H{"data": response})
}
