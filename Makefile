CONTEXT=-f ./docker-compose.yml -p ladesa-management-service
COMPOSE=podman compose ${CONTEXT}

up:
	${COMPOSE} up --build --force-recreate --remove-orphans -d;

down:
	${COMPOSE} down;

restart:
	make down;
	make up;

logs:
	${COMPOSE} logs -f ladesa-management-service;

shell:
	${COMPOSE} exec -u bun ladesa-management-service bash;
