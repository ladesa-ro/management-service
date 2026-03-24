# Ambiente de desenvolvimento

- **Container runtime:** Docker (recomendado). Podman é por conta e risco do usuário.
- **Shell do container:** `zsh` (não `bash`).
- **Task runner:** `just` (receitas no `justfile`).
- **Portas:** `3701` (API), `5432` (PostgreSQL), `9229` (debug), `15672` (RabbitMQ UI).
- **Mock de autenticação:** `ENABLE_MOCK_ACCESS_TOKEN=true` → tokens `mock.siape.<matrícula>`.
- **Autenticação real:** Keycloak via OAuth2/OIDC com validação JWKS.
- **Message broker:** RabbitMQ via Rascal — usado para geração de horários (timetable).
- **Armazenamento de arquivos:** filesystem em `/container/uploaded` (configurável via `STORAGE_PATH`).
