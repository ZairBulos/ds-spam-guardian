ARG NODE_VERSION=22.14-alpine

# Fist stage: Build
FROM node:${NODE_VERSION} AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# Second stage: Run
FROM node:${NODE_VERSION}

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

CMD ["npm", "run", "start"]