# Use the official Node.js image as a base
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY frontend/src/package.json frontend/src/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the public folder containing index.html first, as it's required for the build
COPY frontend/public ./public

# Copy the rest of the frontend source code
COPY frontend/src ./src

# Build the React app (to generate the required index.html in the build folder)
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
