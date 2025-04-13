# Build using Golang base image with Alpine (has GCC)
FROM golang:1.24.0-alpine AS builder

# Install GCC and SQLite dependencies
RUN apk add --no-cache gcc musl-dev sqlite-dev

# Set working directory
WORKDIR /app

# Copy source code to working directory
COPY . .

# Download dependencies
RUN go mod tidy 

# Build the Go application with CGO_ENABLED=1
RUN CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build -o main ./cmd/main.go

# Use Alpine as the final runtime image
FROM alpine:latest
WORKDIR /root/

# Install SQLite runtime dependencies
RUN apk add --no-cache sqlite-libs

# Copy built binary from builder stage
COPY --from=builder /app/main .

# Ensure binary is executable
RUN chmod +x main

# Expose the service port (e.g., 8001)
EXPOSE 8001

# Run the app
CMD ["./main"]
