FROM nginx:1.13.12-alpine
MAINTAINER ITS-GSP

COPY build/ /usr/share/nginx/html
