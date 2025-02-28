# ====== Stage 1: Build Angular Application ======
# Use an official Node.js LTS image as the base for building the Angular app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache for dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire application source code into the container
COPY . .

# Build the Angular application in production mode
RUN npm run build --prod

# ====== Stage 2: Serve the Angular App with Nginx ======
# Use a lightweight Nginx image as the web server
FROM nginx:alpine

# Copy the built Angular application from the first stage into Nginx's default public directory
COPY --from=build /app/dist/heroes-app /usr/share/nginx/html

# Expose port 80 to allow external access to the application
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]