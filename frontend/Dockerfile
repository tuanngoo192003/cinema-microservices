# Step 1: Build the React Vite app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the files and build
COPY . .
RUN npm run build

# Step 2: Use Node base image again for serving the app
FROM node:20-alpine AS deploy

WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/dist .

# Install 'serve' to serve the static files
RUN npm install -g serve

EXPOSE 3000

# Command to serve the app using the 'serve' package
CMD ["serve", "-s", ".", "-l", "3000"]
