# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the root directory to the working directory
COPY ./package.json ./

# Copy the webpack configuration file
COPY ./webpack.config.js ./

# Install dependencies
RUN npm install

# Copy the rest of the application files from the root directory to the working directory
COPY ./frontend ./

# Expose the port that your app runs on
EXPOSE 8080

# Define the command to run your app
CMD ["npm", "run", "build"]

# Define the command to run your app
CMD ["npm", "start"] 

