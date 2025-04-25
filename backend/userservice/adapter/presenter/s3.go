package presenter

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"user-service/infra/config"
	"user-service/usecase"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func UploadFile(c *gin.Context) {
	log := config.GetLogger()
	client := config.GetClient()
	var req usecase.UploadFileRequest
	if err := c.ShouldBind(&req); err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"error": err.Error()}})
		return
	}

	file, err := req.Image.Open()
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": "Unable to open file"}})
		return
	}
	defer file.Close()

	// Read the file into a byte slice
	buf := new(bytes.Buffer)
	_, err = io.Copy(buf, file)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"error": "error read file into a byte slice"}})
		return
	}

	// Convert the byte slice into a bytes.Reader
	fileReader := bytes.NewReader(buf.Bytes())

	fileKey := uuid.New().String()

	_, err = client.Client.PutObject(&s3.PutObjectInput{
		Bucket: aws.String(client.Bucket),
		Key:    aws.String(fileKey),
		Body:   fileReader,
	})
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{
			"error":   err.Error(),
			"message": "error upload object to s3",
		}})
		return
	}

	fileURL := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", client.Bucket, *client.Client.Config.Region, fileKey)
	c.JSON(http.StatusOK, gin.H{"data": usecase.UploadFileResponse{Url: fileURL}})
}
