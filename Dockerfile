ARG NODE_VERSION=22.14-alpine

# Fist stage: Build
FROM node:${NODE_VERSION} AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .

# Second stage: Run
FROM node:${NODE_VERSION}

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

EXPOSE 8000

CMD ["npm", "run", "start"]