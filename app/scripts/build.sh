#!/bin/bash

docker build -t pupupulp/nchikotajs:1.0 .

if [ ! "$(docker ps -q -f name=nchikota)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=nchikota)" ]; then
        # cleanup
        docker rm --force nchikota
    fi
    # run your container
    docker run -d \
        --name="nchikota" \
        -p 9000:9000 \
        --mount type=bind,source=$(pwd)/app,target=/usr/src/nchikota/app,readonly \
        pupupulp/nchikotajs:1.0
fi