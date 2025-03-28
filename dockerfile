# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=18.17.1




################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

ARG REACT_HOST
ARG CLOUD_NAME

# Set working directory for all build stages.
WORKDIR /usr/src/app

ENV PORT=2002

ENV DB_HOST=mongodb://mongo:27017
ENV DB_NAME=GeroldPersonalPortfolio
ENV SERVER_HOST=http://localhost:2002

ENV REACT_APP_CLOUD_NAME=${CLOUD_NAME}
ENV REACT_APP_SERVER_HOST=${REACT_HOST}
ENV REACT_APP_UI_HOST=${REACT_HOST}
ENV REACT_APP_MODE=DEV

################################################################################
# Create a stage for installing production dependecies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --legacy-peer-deps

################################################################################
# Create a stage for building the application.
FROM deps as build

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps --force

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final

# Use production node environment by default.
ENV NODE_ENV production

# Run the application as a non-root user.
USER root

# Copy package.json so that package manager commands can be used.
COPY package.json .

RUN mkdir -p /app/.next/server
RUN chmod -R 777 /app/.next/server

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build
COPY --from=build --chown=nextjs:nodejs /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/index.js ./index.js

COPY config/data/*.json ./config/data/
COPY routes/graphql/queries ./routes/graphql/queries
COPY routes/graphql/types ./routes/graphql/types
COPY interface/public ./interface/public
COPY models ./models
COPY templates ./templates
COPY utils/fields ./utils/fields

# Expose the port that the application listens on.
EXPOSE 2002

# Run the application.
CMD npm start
