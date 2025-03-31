package config

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

type S3Client struct {
	Client *s3.S3
	Bucket string
}

var svc *S3Client

func NewS3Client(config *Config) error {
	log := GetLogger()
	svc = &S3Client{}
	session, err := session.NewSession(
		&aws.Config{
			Region: aws.String(config.S3.Region),
		},
	)
	if err != nil {
		log.Error("Error creating S3 session:", err)
		return err
	}
	client := s3.New(session)
	svc.Client = client
	svc.Bucket = config.S3.Bucket

	return nil
}

func GetClient() (client *S3Client) {
	return svc
}
