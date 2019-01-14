# base images
FROM node:11.3.0

# giving author name
LABEL maintainer="sWaRtHi<yadujain@gmail.com>"

# creating a app dir and set as working dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## copy the sourse code 
# start from scratch
COPY ./package.json /usr/src/app
COPY ./server.js /usr/src/app

# installing dependencies
RUN npm install

## node runner
# dev
RUN npm install -g nodemon
# prod
# RUN npm install -g pm2

# clearing cache
# RUN npm cache clean

# cxposing a port
EXPOSE 3000

# command run 
CMD [ "npm", "start" ]