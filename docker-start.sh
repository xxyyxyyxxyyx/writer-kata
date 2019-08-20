#!/bin/bash
yum install -y htop
cd /tmp
docker build -t writer-kata .
docker run -p 80:80 writer-kata
docker system prune
# docker build -t writer-kata -f /tmp/Dockerfile .