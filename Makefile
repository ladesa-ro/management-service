MAKEFLAGS += --silent

COMPOSE_APP=ladesa-management-service
COMPOSE_APP_USER=happy

COMPOSE_NETWORK=ladesa-net
COMPOSE_PROJECT=ladesa-management-service

COMPOSE_APP_SHELL=zsh
COMPOSE_APP_WORK_DIR=/management-service/
COMPOSE_APP_PWD?=./

COMMAND_TOOL_OCI_RUNTIME=docker
COMMAND_TOOL_OCI_COMPOSE=$(COMMAND_TOOL_OCI_RUNTIME) compose

COMMAND_COMPOSE_SERVICE_OPTIONS=--file docker-compose.yml -p $(COMPOSE_PROJECT)
COMMAND_COMPOSE_SERVICE=$(COMMAND_TOOL_OCI_COMPOSE) $(COMMAND_COMPOSE_SERVICE_OPTIONS)

setup:
	$(shell bash -c "mkdir -p volumes/history && touch volumes/history/{root,happy}-{bash,zsh}")
	$(shell (cd .; find . -type f -name "*.example" -exec sh -c 'cp -n {} $$(basename {} .example)' \;))
	$(shell (bash -c "$(COMMAND_TOOL_OCI_RUNTIME) network create $(COMPOSE_NETWORK) &>/dev/null"))
	
	echo "baixando e construíndo as imagens dos containers, aguarde um instante..."
	$(COMMAND_COMPOSE_SERVICE) build

post-init:
	$(COMMAND_COMPOSE_SERVICE) exec -u $(COMPOSE_APP_USER) $(COMPOSE_APP) bash -c "bun install";

up-no-recreate:
	make setup;
	$(COMMAND_COMPOSE_SERVICE) up --remove-orphans -d --no-recreate;
	make post-init;

up-clean:
	make setup;
	$(COMMAND_COMPOSE_SERVICE) up --remove-orphans -d --force-recreate;

up:
	make up-clean;
	(make post-init; exit 0;)
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
		-d $(COMPOSE_APP) \
			bash -c "bun install && bun run migration:run && bun run start:dev" \&;

logs:
	make setup;
	$(COMMAND_COMPOSE_SERVICE) logs -f;

shell-1000:
	$(COMMAND_COMPOSE_SERVICE) exec -u $(COMPOSE_APP_USER) -w $(COMPOSE_APP_WORK_DIR) $(COMPOSE_APP) bash -c "cd $(COMPOSE_APP_PWD); clear; $(COMPOSE_APP_SHELL)";

shell-root:
	$(COMMAND_COMPOSE_SERVICE) exec -u root -w $(COMPOSE_APP_WORK_DIR) $(COMPOSE_APP) bash -c "cd $(COMPOSE_APP_PWD); clear; $(COMPOSE_APP_SHELL)";
