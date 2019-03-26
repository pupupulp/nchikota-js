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
ENV APP_PATH=/usr/src/app
ENV APP_PORT=8000

# installation of dependencies
RUN apt-get update \
    && apt-get install -qy \
        wget \
        software-properties-common \
        build-essential \
        checkinstall \
        libreadline-gplv2-dev \
        libncursesw5-dev \
        libssl-dev \
        libsqlite3-dev \
        tk-dev \
        libgdbm-dev \
        libc6-dev \
        libbz2-dev

# installation of python
RUN cd ${PYTHON_PATH} \
	&& wget ${PYTHON_URL}/${PYTHON_VER}/Python-${PYTHON_VER}.tgz \
	&& tar xzf Python-${PYTHON_VER}.tgz \
	&& cd Python-${PYTHON_VER} \
	&& ./configure --enable-optimizations \
	&& make altinstall

# installation of node
RUN mkdir -p ${NODE_PATH} && cd ${NODE_PATH} \
    && wget ${NODE_URL}/${NODE_VER}/node-${NODE_VER}-${NODE_DISTRO}.tar.xz \
    && tar -xJvf node-${NODE_VER}-${NODE_DISTRO}.tar.xz

# export node bin to path
ENV PATH=${NODE_PATH}/node-${NODE_VER}-${NODE_DISTRO}/bin:${PATH}

cleanup
RUN rm -rf ${NODE_PATH}/node-${NODE_VER}-${NODE_DISTRO}.tar.xz \
	&& apt-get purge -qy --auto-remove \
			wget \
			software-properties-common \
			build-essential \
			checkinstall \
			libreadline-gplv2-dev \
			libncursesw5-dev \
			libssl-dev \
			libsqlite3-dev \
			tk-dev \
			libgdbm-dev \
			libc6-dev \
			libbz2-dev
	&& rm -rf /var/lib/apt/lists/*

# app setup
WORKDIR ${APP_PATH}

# install app dependencies
COPY package*.json ./
RUN npm config set registry http://registry.npmjs.org/ \
	&& npm cache clean --force \
	&& npm install -g node-gyp \
	&& npm install -g yarn \
	&& yarn install

# load source code
COPY . ./

# expose app
EXPOSE 9000

CMD ["npm", "start"]
