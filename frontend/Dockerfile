# Step 1: Build the React Vite app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the files and build
COPY . .
RUN npm run build

# Step 2: Use an empty stage to only keep built files
FROM alpine AS deploy

WORKDIR /app
COPY --from=build /app/dist .  

EXPOSE 3000

CMD ["sh", "-c", "echo 'Frontend build is ready. Serve it with Nginx.' && sleep infinity"]