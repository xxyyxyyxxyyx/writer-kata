#!/bin/bash
yum install -y htop
cd /tmp
docker build -t writer-kata .
docker run writer-kata
# docker build -t writer-kata -f /tmp/Dockerfile .