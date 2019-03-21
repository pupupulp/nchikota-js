FROM node:8.15.1-alpine

# install app dependencies
WORKDIR /opt/app
COPY package.json ./
RUN npm cache clean --force && npm install

# copy app source code
COPY . /opt/app

# expose docker port
ENV PORT 9000
EXPOSE 9000

CMD ["npm", "start"]