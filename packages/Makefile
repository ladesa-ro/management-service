#MAKEFLAGS += --silent

d_network=ladesa-net
d_container_app=ladesa-management-service

DOCKER=docker

COMPOSE_OPTIONS=--file docker-compose.yml -p ladesa-management-service
COMPOSE_COMMAND=$(DOCKER) compose $(COMPOSE_OPTIONS)

INSIDE_PATH?=./

setup:
	$(shell (cd .; find . -type f -name "*.example" -exec sh -c 'cp -n {} $$(basename {} .example)' \;))
	$(shell (bash -c "$(DOCKER) network create $(d_network) &>/dev/null"))
	
	echo "baixando e buildando as imagens dos containers, aguarde um instante"
	$(COMPOSE_COMMAND) build

post-init:
	$(COMPOSE_COMMAND) exec -u bun $(d_container_app) bash -c "bun install && bunx nx daemon --start";

up-no-recreate:
	make setup;
	$(COMPOSE_COMMAND) up --remove-orphans -d --no-recreate;
	make post-init;

up:
	make setup;
	$(COMPOSE_COMMAND) up --remove-orphans -d --force-recreate;
	make post-init;

stop:
	make setup;
	$(COMPOSE_COMMAND) stop;

down:
	make setup;
	$(COMPOSE_COMMAND) down --remove-orphans;

cleanup:
	$(COMPOSE_COMMAND) down --remove-orphans -v;

start:
	make setup;

	make down;
	make up;

	$(COMPOSE_COMMAND) \
		exec \
		-u node \
		--no-TTY \
		-d $(d_container_app) \
			bash -c "bun install && bun run migration:run && bun run start:dev" \&;

logs:
	make setup;
	$(COMPOSE_COMMAND) logs -f;

shell-1000:
	$(COMPOSE_COMMAND) exec -u bun -w /ladesa/.sources/management-service $(d_container_app) bash -c "cd $(INSIDE_PATH); clear; bash";

shell-root:
	$(COMPOSE_COMMAND) exec -u root -w /ladesa/.sources/management-service $(d_container_app) bash -c "cd $(INSIDE_PATH); clear; bash";
