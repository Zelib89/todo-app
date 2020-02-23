worker_processes 1;
events { worker_connections 1024; }

http {
  gzip on;
  resolver 127.0.0.11;
  sendfile on;
  client_max_body_size 10M;
  send_timeout 30s;
  client_header_timeout 10m;
  client_body_timeout 10m;
  keepalive_timeout 100;
  keepalive_requests 3000;

  proxy_read_timeout 20s;
  proxy_buffer_size 256k;
  proxy_buffers 4 512k;
  proxy_busy_buffers_size 512k;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Host $server_name;
  proxy_set_header Connection '';

  upstream client-ui {
    server todo-app-client:80;
  }

  upstream api {
    server todo-app-server:8080;
  }

  server {
    listen 80;
    listen [::]:80 default_server;

#    listen 443 ssl default_server;
#    listen [::]:443 ssl default_server;

    server_name 0.0.0.0;
#
#    include snippets/ssl-params.conf;
#    include snippets/self-signed.conf;

    location = /favicon.ico {
      log_not_found off;
    }

    location / {
      proxy_pass http://client-ui/;

      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      # proxy_redirect http://client-ui/ /client-ui/;
      # proxy_set_header X-Forwarded-Proto "https";

      # WebSocket support
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";

      client_max_body_size       100m;
      client_body_buffer_size    128k;
    }

    location /server/ {
      proxy_pass http://server/;

      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      # proxy_redirect http://api/ /api/;
      # proxy_set_header X-Forwarded-Proto "https";

      # WebSocket support
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";

      client_max_body_size       100m;
      client_body_buffer_size    128k;
    }

  }

}