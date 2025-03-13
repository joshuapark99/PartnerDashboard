# Use a Node.js 18 Alpine image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your backend listens on (adjust if necessary)
EXPOSE 5000

# Start the backend application (ensure your package.json defines the "start" script)
CMD ["npm", "start"]
