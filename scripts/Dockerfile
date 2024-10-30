FROM node:20-bookworm


WORKDIR /sources

# common packages
RUN apt-get update && \
    apt-get install --no-install-recommends zlib1g-dev -y \
    ca-certificates curl file \
    build-essential \
    autoconf automake autotools-dev libtool xutils-dev && \
    rm -rf /var/lib/apt/lists/*


RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH=/root/.cargo/bin:$PATH
RUN rustup install stable
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

COPY . /sources
RUN npm i
RUN npm run build
