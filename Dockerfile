
# Setup and build the client

FROM node:9.4.0-alpine as client

WORKDIR /usr/app/the-words/
COPY the-words/package*.json ./
RUN npm install -qy
COPY the-words/ ./
RUN npm run build


# Setup the server

FROM node:9.4.0-alpine

WORKDIR /usr/app/
COPY --from=the-words /usr/app/the-words/build/ ./the-words/build/

WORKDIR /usr/app/server/
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

ENV PORT 8000

EXPOSE 8000

# CMD ["npm", "start"]
