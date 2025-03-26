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

// APIRequest defines the request parameters
type APIRequest struct {
	Method  string
	URL     string
	Headers map[string]string
	Body    interface{}
	Timeout time.Duration
}

// SendAPIRequest sends an HTTP request and returns the response
func SendAPIRequest(ctx context.Context, reqData APIRequest) ([]byte, int, error) {
	// Convert body to JSON if not nil
	var bodyReader io.Reader
	if reqData.Body != nil {
		jsonData, err := json.Marshal(reqData.Body)
		if err != nil {
			return nil, 0, err
		}
		bodyReader = bytes.NewBuffer(jsonData)
	}

	// Create HTTP request
	req, err := http.NewRequestWithContext(ctx, reqData.Method, reqData.URL, bodyReader)
	if err != nil {
		return nil, 0, err
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")
	for key, value := range reqData.Headers {
		req.Header.Set(key, value)
	}

	// Create HTTP client with timeout
	client := &http.Client{Timeout: reqData.Timeout}
	resp, err := client.Do(req)
	if err != nil {
		return nil, 0, err
	}
	defer resp.Body.Close()

	// Read response body
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, resp.StatusCode, err
	}

	// Check for non-2xx status codes
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return respBody, resp.StatusCode, errors.New("API request failed with status: " + resp.Status)
	}

	return respBody, resp.StatusCode, nil
}
