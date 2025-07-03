CONTEXT=-f ./docker-compose.yml -p ladesa-management-service
COMPOSE=podman compose ${CONTEXT}

up:
	${COMPOSE} up --build -d;

down:
	${COMPOSE} down;

logs:
	${COMPOSE} logs -f ladesa-management-service;

shell:
	${COMPOSE} exec -u bun ladesa-management-service bash;
