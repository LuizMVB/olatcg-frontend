# Use an official Node runtime as the parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container
COPY . .

# Install the app dependencies
RUN npm install

# Make port 3000 available to the outside
EXPOSE 3000

# Define the command to run the app
CMD [ "npm", "start" ]
