#MAKEFLAGS += --silent

COMPOSE_SERVICE_NETWORK=ladesa-net
COMPOSE_SERVICE_APP=ladesa-management-service
COMPOSE_SERVICE_USER=happy

COMMAND_TOOL_OCI_RUNTIME=docker
COMMAND_TOOL_OCI_COMPOSE=$(COMMAND_TOOL_OCI_RUNTIME) compose

COMMAND_COMPOSE_SERVICE_OPTIONS=--file docker-compose.yml -p ladesa-management-service
COMMAND_COMPOSE_SERVICE=$(COMMAND_TOOL_OCI_COMPOSE) $(COMMAND_COMPOSE_SERVICE_OPTIONS)

SHELL_INSIDE_PATH?=./
SHELL_WORKING_DIR=/source/packages/service

setup:
	$(shell (cd .; find . -type f -name "*.example" -exec sh -c 'cp -n {} $$(basename {} .example)' \;))
	$(shell (bash -c "$(COMMAND_TOOL_OCI_RUNTIME) network create $(COMPOSE_SERVICE_NETWORK) &>/dev/null"))
	
	echo "baixando e buildando as imagens dos containers, aguarde um instante"
	$(COMMAND_COMPOSE_SERVICE) build

post-init:
	$(COMMAND_COMPOSE_SERVICE) exec -u $(COMPOSE_SERVICE_USER) $(COMPOSE_SERVICE_APP) bash -c "bun install && bunx nx daemon --start";

up-no-recreate:
	make setup;
	$(COMMAND_COMPOSE_SERVICE) up --remove-orphans -d --no-recreate;
	make post-init;

up:
	make setup;
	$(COMMAND_COMPOSE_SERVICE) up --remove-orphans -d --force-recreate;
	make post-init;
	make shell-1000;

stop:
	make setup;
	$(COMMAND_COMPOSE_SERVICE) stop;

down:
	make setup;
	$(COMMAND_COMPOSE_SERVICE) down --remove-orphans;

cleanup:
	$(COMMAND_COMPOSE_SERVICE) down --remove-orphans -v;

start:
	make setup;

	make down;
	make up;

	$(COMMAND_COMPOSE_SERVICE) \
		exec \
		-u node \
		--no-TTY \
		-d $(COMPOSE_SERVICE_APP) \
			bash -c "bun install && bun run migration:run && bun run start:dev" \&;

logs:
	make setup;
	$(COMMAND_COMPOSE_SERVICE) logs -f;

shell-1000:
	$(COMMAND_COMPOSE_SERVICE) exec -u $(COMPOSE_SERVICE_USER) -w $(SHELL_WORKING_DIR) $(COMPOSE_SERVICE_APP) bash -c "cd $(SHELL_INSIDE_PATH); clear; bash";

shell-root:
	$(COMMAND_COMPOSE_SERVICE) exec -u root -w $(SHELL_WORKING_DIR) $(COMPOSE_SERVICE_APP) bash -c "cd $(SHELL_INSIDE_PATH); clear; bash";
