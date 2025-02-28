# Use the official MongoDB image from Docker Hub
FROM mongo:latest

# Expose MongoDB port
EXPOSE 27017

# Set up default command to run MongoDB
CMD ["mongod"]
