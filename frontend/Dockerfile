# Step 1: Build React App
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Step 2: Use Alpine for small image
FROM alpine AS deploy

WORKDIR /dist
COPY --from=build /app/dist ./