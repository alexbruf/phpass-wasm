#!/bin/bash

set -e

mkdir -p dist
mkdir -p wasm

if [[ "$(docker images -q phpass-wasm 2>/dev/null)" == "" ]]; then
	docker build -f scripts/Dockerfile -t phpass-wasm .
fi

container_id=$(docker create phpass-wasm)
docker cp $container_id:/sources/wasm .
docker cp $container_id:/sources/dist .
docker cp $container_id:/sources/lib .
docker rm $container_id
