FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

# Use the production start script inside the container
CMD ["npm", "start"]
