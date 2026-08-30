---
name: pre-deploy-security-audit
description: >
  Auditoria de segurança completa antes de deploy para a API NestJS do management-service Ladesa.
  Use quando for realizar deploy para produção, revisar segurança de endpoints ou controllers,
  avaliar conformidade com OWASP API Security Top 10, ou verificar se a configuração de
  autenticação/autorização está correta. Ativado por: "auditar segurança", "pre-deploy", "checar segurança da API".
---

# Pré-Deploy Security Audit — Ladesa Management Service

## Contexto do Projeto

Este é um **NestJS API** monolítico com arquitetura **Hexagonal + DDD + Clean Architecture**, com:

- **Autenticação**: Bearer Token via Passport (`passport-http-bearer`) + Keycloak/OIDC
- **Guard global**: `AuthGuardAdapter` — por padrão **todas** as rotas requerem auth, exceto as marcadas com `@Public()`
- **Throttling global**: `ThrottlerModule` configurado em `AppModule` (20 req / 60s por padrão)
- **Headers de segurança**: `helmet` + CSP configurados em `use-helmet.ts`
- **CORS**: habilitado via `app.enableCors()` (verificar configuração de origem)
- **Validação**: `ZodGlobalValidationPipe` + Zod schemas em todos os DTOs
- **Error handling**: `GlobalExceptionFilter` — **jamais expõe stack trace ao client em produção**
- **Mock token**: `enableMockAccessToken` — **bloqueado em `production`** por lógica em `runtime-options.provider.ts`
- **Docs (Swagger/Scalar)**: **desabilitado em `production`** via `use-docs.ts`
- **49 controllers REST** cobrindo 8 domínios: acesso, ambientes, armazenamento, calendário, ensino, estágio, localidades, relatórios

---

## Processo de Auditoria

Antes de executar qualquer verificação, leia os arquivos relevantes **nesta ordem**:

1. `src/server/nest/app.module.ts` — configuração global (throttling, filtros, interceptors)
2. `src/server/plugins/` — helmet, cors, validation pipe, docs
3. `src/server/nest/auth/` — guards, estratégias, decorators
4. `src/server/nest/filters/` — tratamento de erros e exposição de informações
5. Controllers do domínio sendo auditado

---

## Checklist Completo Pré-Deploy

### 🔐 1. Autenticação e Autorização

#### Verificações automáticas a realizar

**A. Consistência de `@Public()` vs `@NeedsAuth()`**

Para cada controller, verificar:
- Rotas públicas (`@Public()`) fazem sentido semanticamente — são realmente públicas?
- Rotas autenticadas sem `@Public()` dependem do guard global — confirmar que o guard está registrado globalmente
- Rotas com parâmetros de ID (ex: `/:id`) **obrigatoriamente** precisam de verificação de propriedade do recurso (anti-BOLA)

```bash
# Buscar rotas explicitamente públicas no projeto
just exec grep -rn "@Public()" src/modules/ --include="*.controller.ts"

# Buscar rotas com parâmetros dinâmicos sem verificação de ownership
just exec grep -rn "Param.*id" src/modules/ --include="*.controller.ts"
```

**Padrão esperado no projeto:**
```typescript
// ✅ Rota pública — explicitamente marcada
@Post('/login')
@Public()
async login(...) { ... }
```

> **ATENÇÃO CRÍTICA**: Em `auth-guard.adapter.ts`, o `checkIfContextNeedsAuth` usa `?? false`.
> Isso significa que **rotas sem decorator** são tratadas como **NÃO necessitam auth**.
> Todo endpoint sensível DEVE ter `@NeedsAuth()` explícito.

**B. Verificação de Propriedade de Recurso (BOLA/IDOR)**

Para rotas do tipo `GET/PATCH/DELETE /:id`, verificar se o service/command handler valida que o recurso pertence ao usuário autenticado ou que o usuário tem permissão via `accessContext`.

```typescript
// ❌ Vulnerável a BOLA
@Get('/:id')
async findOne(@Param('id') id: string, @AccessContextHttp() ctx: IAccessContext) {
  return this.service.findById(id);  // Não verifica ownership
}

// ✅ Correto — passa accessContext para verificação no domínio
@Get('/:id')
async findOne(@Param('id') id: string, @AccessContextHttp() ctx: IAccessContext) {
  return this.service.findById(ctx, id);  // Domínio verifica se ctx.requestActor pode acessar
}
```

**C. Mock Token em Produção**

```bash
# Verificar que enableMockAccessToken está false em produção
just exec grep -n "enableMockAccessToken" src/infrastructure.config/options/runtime/runtime-options.provider.ts
```

Resultado esperado: `nodeEnv !== "production" && enableMockAccessTokenRaw === "true"` — a lógica já garante isso, mas **confirme que `NODE_ENV=production` está definido no deploy**.

---

### 🌐 2. CORS — Risco Atual: ALTO

**Problema identificado**: `use-cors.ts` usa `app.enableCors()` **sem configuração de origem**.

Isso equivale a `Access-Control-Allow-Origin: *` para browsers com credentials.

```bash
# Verificar configuração atual de CORS
cat src/server/plugins/use-cors.ts
```

**Verificação obrigatória antes do deploy:**

```typescript
// ❌ ATUAL — CORS wildcard (permissivo demais para APIs autenticadas)
app.enableCors();

// ✅ ESPERADO para produção
app.enableCors({
  origin: process.env.APP_PUBLIC_BASE_URL?.split(',') ?? false,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
```

**Pergunta ao time antes do deploy**: `APP_PUBLIC_BASE_URL` está configurado no ambiente de produção com a origem correta?

---

### 🛡️ 3. Headers de Segurança (Helmet)

**Configuração atual em `use-helmet.ts`** — verificar os seguintes pontos:

```bash
cat src/server/plugins/use-helmet.ts
```

| Header / Diretiva | Status Atual | Risco |
|---|---|---|
| `defaultSrc: ['self']` | ✅ Correto | — |
| `scriptSrc: 'unsafe-inline', 'unsafe-eval'` | ⚠️ Necessário para Swagger/Scalar | Médio — só em dev |
| `crossOriginResourcePolicy: false` | ⚠️ Desabilitado | Médio — verificar necessidade |
| HSTS | ✅ Helmet default | — |
| `X-Content-Type-Options` | ✅ Helmet default | — |
| `X-Frame-Options` | ✅ Helmet default | — |

**Verificação**: `unsafe-inline` e `unsafe-eval` no CSP são aceitáveis **apenas** se o Swagger/Scalar é desabilitado em produção. Confirmar que `use-docs.ts` verifica `nodeEnv === "production"`.

---

### 🔒 4. Rate Limiting

**Configuração global atual**: `ThrottlerModule` com `ttl: 60000, limit: 20` (20 req/min global).

```bash
# Verificar endpoints com throttling específico
just exec grep -rn "ThrottlerGuard\|@Throttle" src/modules/ --include="*.ts"
```

**Verificações:**

- [ ] Endpoints de autenticação (`/autenticacao/login`, `/autenticacao/login/refresh`) têm throttling mais restritivo que o global?
- [ ] O `ThrottlerGuard` global está aplicado? (verificar se há `APP_GUARD` com `ThrottlerGuard` em `AppModule`)
- [ ] Endpoints de `redefinir-senha` e `definir-senha` têm proteção adicional?

```typescript
// Padrão atual: apenas folha-ponto-token usa ThrottlerGuard explicitamente
// RECOMENDADO: aplicar ThrottlerGuard globalmente ou em endpoints sensíveis de auth

// Em AppModule providers:
{
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
}
```

---

### 🗄️ 5. Variáveis de Ambiente Críticas

**Verificar que TODAS as seguintes variáveis estão presentes e não-vazias em produção:**

```bash
# Variáveis obrigatórias para produção segura
NODE_ENV=production
DATABASE_URL=                          # Obrigatório — não pode ser default
DATABASE_USE_SSL=true                  # Produção DEVE usar SSL
OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER=    # OIDC issuer do Keycloak
OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_ID=
OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_SECRET=
KC_BASE_URL=
KC_REALM=
KC_CLIENT_ID=
KC_CLIENT_SECRET=
ENABLE_MOCK_ACCESS_TOKEN=false         # NUNCA true em produção
WAHA_WEBHOOK_HMAC_KEY=                 # Se WAHA ativo, HMAC key obrigatória
```

**Verificações críticas:**

```bash
# Confirmar que .env não está no git
git check-ignore .env
git log --all --full-history -- .env  # Checar histórico por vazamentos

# Confirmar que .env.example não contém secrets reais
grep -E "(password|secret|key|token)" .env.example | grep -v "your_|placeholder|<"
```

**Nunca em produção:**
- `ENABLE_MOCK_ACCESS_TOKEN=true`
- `NODE_ENV` diferente de `production`
- Secrets iguais aos valores de exemplo do `.env.example`

---

### 📊 6. Exposição de Dados Sensíveis

**A. Verificar que erros não expõem stack trace**

`GlobalExceptionFilter` → `buildStandardizedErrorResponse` → mapeia para resposta padronizada **sem** stack trace. ✅

Para erros 500 genéricos, a mensagem é:
```
"Ocorreu um erro interno. Tente novamente mais tarde."
```

**B. Verificar que DTOs de resposta não expõem campos sensíveis**

```bash
# Buscar retornos diretos de entidades TypeORM (anti-pattern)
just exec grep -rn "UsuarioEntity" src/modules/*/presentation.rest/ --include="*.controller.ts"

# Buscar campos sensíveis nos DTOs de saída
just exec grep -rni "password\|senha\|hash\|secret" src/modules/*/presentation.rest/*.dto.ts
```

Padrão esperado: controllers usam `*.rest.mapper.ts` para converter entidade → DTO de resposta.

---

### 🔗 7. Dependências com Vulnerabilidades

```bash
# Auditoria de dependências (executar dentro do container)
just exec bun audit

# Verificar dependências desatualizadas
just exec bun outdated
```

**Triagem dos resultados:**
- **Critical/High + runtime dep**: bloqueante para deploy
- **Critical/High + devDependency only**: não bloqueante, mas corrigir logo
- **Moderate**: agendar correção no próximo ciclo
- **Low**: backlog

---

### 🏗️ 8. Configuração de Infraestrutura

**A. SSL no banco de dados**
```bash
just exec grep -n "DATABASE_USE_SSL\|ssl" src/infrastructure.config/ -r
```

**B. Conexão Redis (Socket.IO Adapter)**
```bash
cat src/server/plugins/redis-io.adapter.ts
```
- Redis em produção deve ter autenticação (`requirepass`) configurada
- Verificar se `QUEUE_DATABASE_URL` usa SSL/TLS para o broker

**C. Webhook HMAC (WAHA)**

Se o módulo de WhatsApp (WAHA) estiver ativo:
```bash
just exec grep -rn "WAHA_WEBHOOK_HMAC_KEY\|hmac\|webhook" src/ --include="*.ts" -i
```
- `WAHA_WEBHOOK_HMAC_KEY` deve estar definida e não-vazia
- Webhooks de entrada devem validar assinatura HMAC antes de processar payload

---

### 📝 9. Logging e Auditoria

```bash
just exec grep -rn "RequestLoggingInterceptor" src/ --include="*.ts"
```

**Nunca logar:**
- Tokens de acesso completos
- Senhas (mesmo erradas)
- Conteúdo completo de bodies de requests de autenticação
- PII desnecessário

O correlationId está presente no `GlobalExceptionFilter` — facilita rastreamento de erros sem expor internals.

---

### ⚡ 10. Idempotência e Condições de Corrida

O projeto tem `IdempotencyModule`. Verificar:

```bash
just exec grep -rn "IdempotencyService\|idempotency" src/modules/ --include="*.ts" -i
```

- Operações financeiras ou de estado crítico usam idempotência?
- Endpoints de `POST` que criam recursos verificam duplicação?

---

## Checklist de Execução — Copie e Use

```markdown
## Auditoria de Segurança Pré-Deploy — Ladesa Management Service
Data: ___________
Responsável: ___________
Versão / Commit: ___________

### Autenticação & Autorização
- [ ] Rotas públicas (@Public) auditadas — todas justificadas?
- [ ] NENHUM endpoint sensível sem decorator de auth (confirmar comportamento ?? false do guard)
- [ ] Rotas com /:id passam accessContext para verificação de ownership no domínio
- [ ] ENABLE_MOCK_ACCESS_TOKEN=false em produção
- [ ] NODE_ENV=production definido

### CORS
- [ ] app.enableCors() configurado com origem específica (não wildcard)
- [ ] APP_PUBLIC_BASE_URL definido no ambiente de produção

### Rate Limiting
- [ ] Endpoints /autenticacao/login e /login/refresh têm throttling restritivo
- [ ] ThrottlerGuard global ativo (APP_GUARD) ou em endpoints críticos
- [ ] /definir-senha e /redefinir-senha protegidos contra brute force

### Variáveis de Ambiente
- [ ] .env não commitado no git
- [ ] .env.example não contém secrets reais
- [ ] DATABASE_USE_SSL=true
- [ ] Todos os secrets KC_* preenchidos
- [ ] WAHA_WEBHOOK_HMAC_KEY preenchido (se WAHA ativo)

### Dados Sensíveis
- [ ] Nenhum DTO de resposta expõe passwordHash, tokens ou campos sensíveis
- [ ] Entidades TypeORM não retornadas diretamente nos controllers
- [ ] Erros 500 não expõem stack trace (validado via GlobalExceptionFilter)

### Infraestrutura
- [ ] Banco de dados com SSL ativo
- [ ] Redis com autenticação
- [ ] Docs Swagger/Scalar desabilitados em produção

### Dependências
- [ ] bun audit sem itens critical/high em deps de runtime
- [ ] bun outdated revisado

### Build & Testes
- [ ] just exec bun run code:fix — sem erros
- [ ] just exec bun run check — tipagem válida
- [ ] Todos os testes passando
```

---

## Remediações Rápidas — Código Pronto

### CORS Restritivo

```typescript
// src/server/plugins/use-cors.ts
import { INestApplication } from "@nestjs/common";

export const useCors = (app: INestApplication) => {
  const allowedOrigins = process.env.APP_PUBLIC_BASE_URL
    ? process.env.APP_PUBLIC_BASE_URL.split(",").map((o) => o.trim())
    : [];

  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : false,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Idempotency-Key"],
    credentials: true,
  });
};
```

### ThrottlerGuard Global

```typescript
// Em src/server/nest/app.module.ts — adicionar ao array providers:
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard } from "@nestjs/throttler";

// providers: [
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
// ]
```

### Throttling Específico para Autenticação

```typescript
// Em autenticacao.rest.controller.ts
import { Throttle } from "@nestjs/throttler";

@Post("/login")
@Public()
@Throttle({ default: { limit: 5, ttl: 60000 } })  // 5 tentativas por minuto
async login(...) { ... }

@Post("/login/refresh")
@Public()
@Throttle({ default: { limit: 10, ttl: 60000 } })  // 10 por minuto
async refresh(...) { ... }
```

---

## Referências

- [OWASP API Security Top 10 (2023)](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
- [OWASP BOLA (API1:2023)](https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/)
- [NestJS Security](https://docs.nestjs.com/security/helmet)
- [NestJS Throttler](https://docs.nestjs.com/security/rate-limiting)
- [Projeto — SECURITY.md](../../SECURITY.md)
- [Projeto — docs/operacao/seguranca.md](../../docs/operacao/seguranca.md)
