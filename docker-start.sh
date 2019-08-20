#!/usr/bin/env bash
yum install htop
docker build -t writer-kata -f /tmp/Dockerfile .