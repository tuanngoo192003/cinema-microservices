package client

import (
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CinemaServiceHealthCheck(c *gin.Context) {
	// Define the service URL (use Docker network service name instead of localhost)
	serviceURL := "http://cinemaservice:8001/"

	// Make GET request
	resp, err := http.Get(serviceURL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to call user service"})
		return
	}
	defer resp.Body.Close()

	// Read response
	body, _ := io.ReadAll(resp.Body)

	// Return the response from user-service
	c.JSON(http.StatusOK, body)
}
