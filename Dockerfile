FROM node:12.14-slim
LABEL group="todo-app" name="todo-app-server"

# add tini
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

# expose port
EXPOSE 8080

# set working dir
RUN mkdir /app && chown -R node:node /app
WORKDIR /app

# install global dependencies
RUN npm i -g pm2

# install and cache app dependencies
#COPY --chown=node:node package.json package-lock*.json ./
COPY package.json package-lock*.json ./
RUN npm i && npm cache clean --force
RUN mkdir client
COPY client/package.json client/package-lock*.json ./client/
RUN cd client && npm i && npm cache clean --force

#COPY --chown=node:node . .

COPY . .
RUN npm run build:client

# settings
ENV NODE_ENV=production
RUN npm i && npm cache clean --force

# build app
CMD ["pm2-runtime", "./bin/www"]