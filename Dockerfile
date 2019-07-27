FROM node:carbon
MAINTAINER Theo Kim Theo.kim@tripllet.com
 
RUN mkdir -p /app
 
WORKDIR /app
 
ADD ./ /app
 
RUN npm install

CMD node ./bin/www
