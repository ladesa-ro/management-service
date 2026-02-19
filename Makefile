#MAKEFLAGS += --silent

COMPOSE_SERVICE_NETWORK=ladesa-net
COMPOSE_SERVICE_APP=ladesa-management-service
COMPOSE_SERVICE_USER=happy

COMMAND_TOOL_OCI_RUNTIME=docker
COMMAND_TOOL_OCI_COMPOSE=$(COMMAND_TOOL_OCI_RUNTIME) compose

COMMAND_COMPOSE_SERVICE_OPTIONS=--file .docker/compose.yml -p ladesa-management-service
COMMAND_COMPOSE_SERVICE=$(COMMAND_TOOL_OCI_COMPOSE) $(COMMAND_COMPOSE_SERVICE_OPTIONS)

SHELL_INSIDE=zsh
SHELL_INSIDE_PATH?=./
SHELL_WORKING_DIR=/ladesa/management-service/src/app

setup:
	mkdir -p volumes/history
	touch volumes/history/{root,happy}-{bash,zsh}
	find . -maxdepth 1 -type f -name "*.example" -exec sh -c 'cp -n "$$1" "$$(echo $$1 | sed s/.example//)"' _ {} \;
	$(COMMAND_TOOL_OCI_RUNTIME) network create $(COMPOSE_SERVICE_NETWORK) 2>/dev/null || true
	@echo "baixando e buildando as imagens dos containers, aguarde um instante"
	$(COMMAND_COMPOSE_SERVICE) build

post-init:
	$(COMMAND_COMPOSE_SERVICE) exec -u $(COMPOSE_SERVICE_USER) $(COMPOSE_SERVICE_APP) bash -c "cd /ladesa/management-service/src && bun install";

up-no-recreate:
	make setup;
	$(COMMAND_COMPOSE_SERVICE) up --remove-orphans -d --no-recreate;
	make post-init;

up-clean:
	make setup;
	$(COMMAND_COMPOSE_SERVICE) up --remove-orphans -d --force-recreate;

up:
	make up-clean;
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
	make up-clean;
	make post-init;

	$(COMMAND_COMPOSE_SERVICE) \
		exec \
		-u $(COMPOSE_SERVICE_USER) \
		--no-TTY \
		-d $(COMPOSE_SERVICE_APP) \
			bash -c "cd /ladesa/management-service/src && bun install && cd app && bun run migration:run && bun run dev";

logs:
	make setup;
	$(COMMAND_COMPOSE_SERVICE) logs -f;

shell-1000:
	$(COMMAND_COMPOSE_SERVICE) exec -u $(COMPOSE_SERVICE_USER) -w $(SHELL_WORKING_DIR) $(COMPOSE_SERVICE_APP) bash -c "cd $(SHELL_INSIDE_PATH); clear; $(SHELL_INSIDE)";

shell-root:
	$(COMMAND_COMPOSE_SERVICE) exec -u root -w $(SHELL_WORKING_DIR) $(COMPOSE_SERVICE_APP) bash -c "cd $(SHELL_INSIDE_PATH); clear; $(SHELL_INSIDE)";

generate-erd:
	$(COMMAND_COMPOSE_SERVICE) exec -u $(COMPOSE_SERVICE_USER) $(COMPOSE_SERVICE_APP) \
		bash -c 'mermerd -c "$$DATABASE_URL" -s public --useAllTables --encloseWithMermaidBackticks --showDescriptions notNull --showAllConstraints -o /ladesa/management-service/docs/erd/erd.md'
