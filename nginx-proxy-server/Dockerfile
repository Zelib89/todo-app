FROM nginx:1.17-alpine
LABEL group="todo-app" name="todo-app-proxy"
COPY ./conf.d /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]