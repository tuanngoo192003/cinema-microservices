# Build using Golang base image
FROM golang:1.24.0 AS builder 

# Set working directory
WORKDIR /app

# Copy source code to working directory
COPY . .

# Download dependencies
RUN go mod tidy 

# Build the Go application for Linux (statically linked for Alpine)
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main ./cmd/main.go

# Use a minimal image to run the app
FROM alpine:latest
WORKDIR /root/

#Copy built binary from builder stage
COPY --from=builder /app/main .

# Ensure binary is executable
RUN chmod +x main

# Expose the service port (e.g., 8082)
EXPOSE 8001

# Run the app
CMD ["./main"]
