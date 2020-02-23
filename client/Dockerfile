# base image
FROM node:12.14-slim AS build
LABEL stage="todo-app-medium"

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/
RUN npm install --silent
COPY . .
RUN npm run build

# start app
FROM nginx:1.17-alpine
LABEL group="todo-app" name="todo-app-client"
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]