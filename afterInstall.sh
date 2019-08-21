#!/bin/bash
cd /tmp
docker build -t writer-kata .
docker run -d -p 80:3000 writer-kata
docker system prune -f
# docker build -t writer-kata -f /tmp/Dockerfile .