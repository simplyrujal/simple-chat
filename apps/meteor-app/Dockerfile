FROM node:22-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy the built bundle from correct path (relative to repo root)
COPY apps/meteor-app/bundle .

WORKDIR /app/programs/server
RUN npm install

WORKDIR /app

EXPOSE 3000

ENV MONGO_URL=mongodb://mongo:27017/simple-chat
ENV ROOT_URL=http://localhost:3000
ENV PORT=3000

CMD ["node", "main.js"]
