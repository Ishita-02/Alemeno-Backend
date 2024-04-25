# Use the official Node.js 18.x image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose any ports your app is listening on
EXPOSE 3000

# Command to run your application
CMD ["node", "index.js"]
