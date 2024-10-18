# Use the official Node.js 21.1.0 image as the base image
FROM node:21.1.0

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the entire application code to the working directory
COPY . .

# Expose port 5173 (often used for Vite or other development preview servers)
EXPOSE 5173

RUN npm install
# Build the application for production
RUN npm install -g serve

RUN npm run build

# Use PM2 to run the application in preview mode
CMD ["serve", "-s", "dist", "-l", "5173"]
