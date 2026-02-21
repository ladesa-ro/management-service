# justfile

set shell := ["bash", "-euo", "pipefail", "-c"]

COMPOSE_SERVICE_APP := "management-service"
COMPOSE_SERVICE_USER := "happy"

COMMAND_TOOL_OCI_RUNTIME := env_var_or_default("OCI_RUNTIME", "docker")
COMMAND_COMPOSE_SERVICE := COMMAND_TOOL_OCI_RUNTIME + " compose --file .docker/compose.yml -p ladesa-management-service"

SHELL_INSIDE := "zsh"
SHELL_INSIDE_PATH := "./"
SHELL_WORKING_DIR := "/ladesa/management-service/src/app"

# Mostra as receitas disponíveis
default:
    @just --list

# Passa argumentos direto pro docker compose
compose *ARGS:
    {{COMMAND_COMPOSE_SERVICE}} {{ARGS}}

# Builda as imagens (só se inputs mudaram)
build:
    #!/usr/bin/env bash
    set -euo pipefail

    HASH=$(cat .docker/Containerfile src/.bun-version src/.dockerignore 2>/dev/null | sha256sum | cut -d' ' -f1)
    HASH_FILE=".docker/.build-hash"

    if [ -f "$HASH_FILE" ] && [ "$(cat "$HASH_FILE")" = "$HASH" ]; then
        echo "[BUILD] Imagem já está atualizada ✅"
    else
        echo "[BUILD] Baixando e construindo imagens... ☕"
        {{COMMAND_COMPOSE_SERVICE}} build -q
        echo "$HASH" > "$HASH_FILE"
        echo "[BUILD] Imagens atualizadas ✅"
    fi

# Força rebuild das imagens
rebuild:
    @echo "[BUILD] Forçando rebuild... ☕"
    {{COMMAND_COMPOSE_SERVICE}} build -q
    @rm -f .docker/.build-hash
    @echo "[BUILD] Imagens atualizadas ✅"

# Prepara volumes e copia .example
setup:
    mkdir -p volumes/history
    touch volumes/history/{root,happy}-{bash,zsh}
    find . -maxdepth 1 -type f -name "*.example" -exec sh -c \
        'cp -n "$1" "$(echo $1 | sed s/.example//)"' _ {} \;

# Instala dependências dentro do container
[private]
post-init:
    {{COMMAND_COMPOSE_SERVICE}} exec -u {{COMPOSE_SERVICE_USER}} {{COMPOSE_SERVICE_APP}} \
        bash -c "cd /ladesa/management-service/src && bun install"

# Sobe os containers
start: setup build
    {{COMMAND_COMPOSE_SERVICE}} up --remove-orphans -d
    just post-init

# Para os serviços
stop: setup
    {{COMMAND_COMPOSE_SERVICE}} stop

# Derruba os serviços
down:
    {{COMMAND_COMPOSE_SERVICE}} down --remove-orphans

# Sobe os containers e abre o shell
up:
    just start
    just shell-1000

# Derruba tudo incluindo volumes
[confirm("Isso vai remover os volumes. Continuar? (y/n)")]
cleanup:
    {{COMMAND_COMPOSE_SERVICE}} down --remove-orphans -v

# Sobe e acompanha logs
logs:
    {{COMMAND_COMPOSE_SERVICE}} logs -f

# Shell como usuário normal
shell-1000:
    just start
    just _shell {{COMPOSE_SERVICE_USER}}

# Shell como root
shell-root:
    just start
    just _shell "root"

# Receita interna para abrir shell
[private]
_shell user:
    {{COMMAND_COMPOSE_SERVICE}} exec -u {{user}} -w {{SHELL_WORKING_DIR}} {{COMPOSE_SERVICE_APP}} \
        bash -c "cd {{SHELL_INSIDE_PATH}}; clear; {{SHELL_INSIDE}}"
