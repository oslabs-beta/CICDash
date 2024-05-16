# Use an official Node.js runtime as the base image
FROM node:17-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json file from the root directory into the container at /app
COPY ./frontend/package.json .

# Install npm dependencies
RUN npm install

# Copy the frontend code from the frontend directory into the container at /app
COPY . .

# Expose port 3000 to allow communication to/from server
EXPOSE 8080

# Command to run your application
CMD ["npm", "build"]

# Command to run your application
CMD ["npm", "start"]