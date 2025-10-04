FROM docker.io/alpine:3 AS os
RUN apk add --no-cache curl bash shadow gcompat libstdc++ libgcc

FROM os AS app-runtime

RUN addgroup -g 1000 happy && adduser -u 1000 -G happy -D happy

ENV BUN_INSTALL="/opt/bun"
ENV PATH="${BUN_INSTALL}/bin:$PATH"
RUN curl -fsSL https://bun.sh/install | bash -s -- bun-v1.2.23

ENV BUN_INSTALL_CACHE_DIR="/tmp/bun-cache"

FROM app-runtime AS app-development

USER root
RUN apk add --no-cache git zsh

USER 1000:1000
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN sed -i 's/^ZSH_THEME=.*/ZSH_THEME="josh"/' ~/.zshrc
