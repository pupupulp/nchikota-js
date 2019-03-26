# base image
FROM ubuntu:18.04

# maintainer
LABEL maintainer="pupupulp"

# skip configurable/interactive installations
ENV DEBIAN_FRONTEND noninteractive

# node environment variables
ENV NODE_URL=https://nodejs.org/dist
ENV NODE_VER=v11.12.0
ENV NODE_DISTRO=linux-x64
ENV NODE_PATH=/usr/local/lib/nodejs

# app environment variables
ENV APP_PATH=/usr/src/app
ENV APP_PORT=8000

# installation of dependencies
RUN apt-get update \
    && apt-get install -qy \
        wget \
        software-properties-common \
        python2.7

# installation of node
RUN mkdir -p ${NODE_PATH} && cd ${NODE_PATH} \
    && wget ${NODE_URL}/${NODE_VER}/node-${NODE_VER}-${NODE_DISTRO}.tar.xz \
    && tar -xJvf node-${NODE_VER}-${NODE_DISTRO}.tar.xz

# export node bin to path
ENV PATH=${NODE_PATH}/node-${NODE_VER}-${NODE_DISTRO}/bin:${PATH}

# cleanup
RUN rm -rf ${NODE_PATH}/node-${NODE_VER}-${NODE_DISTRO}.tar.xz \
	&& apt-get purge -qy --auto-remove \
		wget \
	&& rm -rf /var/lib/apt/lists/*

# app setup
WORKDIR ${APP_PATH}

# install app dependencies
COPY package*.json ./

RUN npm config set registry to http://registry.npmjs.org/ \
	&& npm cache clean \
	&& npm install -g node-gyp

# RUN npm install

# load source code
# COPY . ./

# expose app
# EXPOSE 9000

# CMD ["npm", "start"]
