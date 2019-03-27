# base image
FROM ubuntu:18.04

# maintainer
LABEL maintainer="pupupulp"

# skip configurable/interactive installations
ENV DEBIAN_FRONTEND noninteractive

# python environment variables
ENV PYTHON_URL=https://www.python.org/ftp/python
ENV PYTHON_VER=2.7.15
ENV PYTHON_PATH=/usr/src

# node environment variables
ENV NODE_URL=https://nodejs.org/dist
ENV NODE_VER=v11.12.0
ENV NODE_DISTRO=linux-x64
ENV NODE_PATH=/usr/local/lib/nodejs

# app environment variables
ENV APP_PATH=/usr/src/nchikota
ENV APP_VOLUME=/usr/src/nchikota/app
ENV APP_PORT=9000

# installation of dependencies
RUN apt-get update \
    && apt-get install -qy \
        wget \
        software-properties-common \
		build-essential \
		python2.7

# installation of python
RUN ln -s /usr/bin/python2.7 /usr/bin/python

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
			software-properties-common \
	&& rm -rf /var/lib/apt/lists/*

# app setup
WORKDIR ${APP_PATH}

# install app dependencies
COPY package*.json ./
RUN npm cache clean --force \
	&& npm install -g node-gyp \
	&& npm install -g yarn \
	&& yarn install

# expose app
EXPOSE ${APP_PORT}

# load app source code
VOLUME ["${APP_VOLUME}"]

# start app
CMD ["npm", "start"]
