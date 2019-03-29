# nchikota-js

![contributors](https://badgen.net/github/contributors/pupupulp/nchikota-js)
![stars](https://badgen.net/github/stars/pupupulp/nchikota-js)
![commits](https://badgen.net/github/commits/pupupulp/nchikota-js)
![last commit](https://badgen.net/github/last-commit/pupupulp/nchikota-js)
[![License](https://badgen.net/github/license/pupupulp/nchikota-js)](https://github.com/pupupulp/nchikota-js/blob/master/LICENSE)

An opensource tech stack composed of ExpressJS, NodeJS, ExtJS

## Quickstart

### Installation

#### Docker Setup

1. **CentOS**

```cli
$ sudo yum install -y yum-utils \
    device-mapper-persistent-data \
    lvm2

$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

$ sudo yum install docker-ce docker-ce-cli containerd.io

$ sudo systemctl start docker
```

2. **Debian**

```cli
$ sudo apt-get update

$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    software-properties-common

$ curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -

$ sudo apt-key fingerprint 0EBFCD88

$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

$ sudo apt-get update

$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

3. **Fedora**

```cli
$ sudo dnf -y install dnf-plugins-core

$ sudo dnf config-manager \
    --add-repo \
    https://download.docker.com/linux/fedora/docker-ce.repo

$ sudo dnf install docker-ce docker-ce-cli containerd.io

$ sudo systemctl start docker
```

4. **Ubuntu**

```cli
$ sudo apt-get update

$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

$ sudo apt-key fingerprint 0EBFCD88

$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

$ sudo apt-get update

$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

5. **[MacOS](https://docs.docker.com/docker-for-mac/install/)**
6. **[Windows](https://docs.docker.com/docker-for-windows/install/)**

#### App Setup

1. **Clone the repository**

```cli
$ git clone https://github.com/pupupulp/nchikota-js.git
```

2. **Go to source directory**
```cli
$ cd nchikota-js
```

3. **Build docker image**
```cli
$ docker build -t pupupulp/nchikotajs:1.0 .
```


### Usage
**Run docker image**
```cli
$ docker run -d \
    --name="nchikota" \
    -p 9000:9000 \
    --mount type=bind,source=$(pwd)/app,target=/usr/src/nchikota/app,readonly \
    pupupulp/nchikotajs:1.0
```

### Build
1. **Change permission of script**
```cli
$ chmod +x app/scripts/build.sh
```

2. **Run the script**
```cli
$ app/scripts/build.sh
```

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, please [create an issue](https://github.com/pupupulp/nchikota-js/issues/new).

### Related Projects

You might want to checkout these projects:

- [KonyvtarJS](https://github.com/pupupulp/konyvtar-js) - An opensource library/package of code wrappers for ExtJS 6.2.0 GPL.
- [PasserelleJS](https://github.com/pupupulp/passerelle-js) - An opensource API gateway built with ExpressJS.

### Contributors

### Author

**Eagan Martin**
- [Github](https://github.com/pupupulp)
- [LinkedIn]()

### License

Copyright © 2019, [Eagan Martin](https://github.com/pupupulp). Release under the [GPL-3.0 License](https://github.com/pupupulp/nchikota-js/blob/master/LICENSE)