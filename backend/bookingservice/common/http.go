package common

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"time"
)

const (
	HTTP_CLIENT_MOVIE_BASE_URL = "http://localhost:8002"
	HTTP_CLIENT_USER_BASE_URL  = "http://localhost:8001"
)

type APIRequest struct {
	Method  string
	URL     string
	Headers map[string]string
	Body    interface{}
	Timeout time.Duration
}

func SendRequest[T any](ctx context.Context, reqData APIRequest) (*T, error) {
	var bodyReader io.Reader
	if reqData.Body != nil {
		jsonData, err := json.Marshal(reqData.Body)
		if err != nil {
			return nil, err
		}
		bodyReader = bytes.NewBuffer(jsonData)
	}

	req, err := http.NewRequestWithContext(ctx, reqData.Method, reqData.URL, bodyReader)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	for key, value := range reqData.Headers {
		req.Header.Set(key, value)
	}

	client := &http.Client{Timeout: reqData.Timeout}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, errors.New("API request failed with status: " + resp.Status)
	}

	var result T
	if err := json.Unmarshal(respBody, &result); err != nil {
		return nil, err
	}

	return &result, nil
}
