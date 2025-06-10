MAKEFLAGS += --silent

d_network=ladesa-net
d_container_app=ladesa-api

compose_options=--file docker-compose.yml -p ladesa-api

setup:
	$(shell (cd .; find . -type f -name "*.example" -exec sh -c 'cp -n {} $$(basename {} .example)' \;))
	$(shell (bash -c "docker network create $(d_network) &>/dev/null"))
	
	echo "baixando imagens base dos containers, isso pode levar alguns minutos..."
	docker compose $(compose_options) build

prepare:
	# docker compose $(compose_options) exec $(d_container_app) bash -c "bun install && bunx nx daemon --start";
	docker compose $(compose_options) exec $(d_container_app) bash -c "ls -la";

up:
	make setup;
	docker compose $(compose_options) up --remove-orphans -d;
	make prepare;

up-recreate:
	make setup;
	docker compose $(compose_options) up --remove-orphans -d --force-recreate;
	make prepare;

start:
	make setup;

	make down;
	make up;

	docker compose $(compose_options) \
		exec \
		-u node \
		--no-TTY \
		-d $(d_container_app) \
			bash -c "pnpm install && pnpm run --filter '@ladesa-ro/api.service' migration:run && pnpm run --filter @ladesa-ro/api.service start:dev" \&;

logs:
	make setup;
	docker compose $(compose_options) logs -f;

INSIDE_PATH?=./

shell:
	make setup;
	make up;
	
	docker compose $(compose_options) exec $(d_container_app) bash -c "cd $(INSIDE_PATH); clear; bash";

shell-root:
	make setup;
	make up;
	docker compose $(compose_options) exec -u root $(d_container_app) bash -c "cd $(INSIDE_PATH); clear; bash";

stop:
	make setup;
	docker compose $(compose_options) stop;

down:
	make setup;
	docker compose $(compose_options) down --remove-orphans;

cleanup:
	docker compose $(compose_options) down --remove-orphans -v;