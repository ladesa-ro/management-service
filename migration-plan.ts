/*
Migração de qualquer feature legada → Estrutura padrão (referência: "estado" e "cidade")
Algoritmo de migração (alto nível) — somente plano e passos gerais (GENÉRICO)
Data: 2025-09-07

Diretriz: Este plano NÃO é específico para nenhuma feature. Em caso de dúvidas, siga os exemplos e convenções de "estado" e, secundariamente, "cidade".

Contexto atual observado (resumo mínimo):
- Feature existente: packages/service/lib/features/<feature>/
  - <feature>.module.ts
  - api/
    - <feature>.controller.ts
    - <feature>.routes.tsp (se existir TypeSpec)
  - domain/
    - <feature>.model.tsp (se existir)
    - <feature>.params.tsp (se existir)
    - <feature>.service.ts (se existir)
- Referência(s) alvo atualizadas: features "estado" e "cidade"
  - Estado: aplicação completa com application/, infrastructure/ (persistence typeorm + providers), presentation/rest (controllers, routes, schemas), módulo da feature.
  - Cidade: já possui application/schemas, infrastructure/persistence/typeorm/repositories, presentation/rest/schemas.

Objetivo
- Migrar qualquer feature legada para uma organização semelhante à de "estado",
  seguindo princípios de DDD, Clean Architecture e feature-first, aproveitando
  convenções também já usadas em "cidade".

Fases principais
1) Extração dos metadados da estrutura antiga
2) Migração da estrutura antiga para a nova

Importante
- Este arquivo é apenas um PLANO (comentário) com um algoritmo em passos gerais.
- Implementações, scripts automatizados ou refactors devem ser feitos em etapas subsequentes.

=====================================================================
1) EXTRAÇÃO DOS METADADOS DA ESTRUTURA ANTIGA
=====================================================================
Objetivo: inventariar o que existe hoje para que a migração seja determinística.

1.1. Descoberta de artefatos por camada e papel
- Mapear arquivos e responsabilidades atuais dentro de features/<feature>:
  - Domain: modelos, services, regras puras, tipos/params (ex.: domain/*.ts, *.tsp)
  - Application: (se existir) ports/interfaces, DTOs, use cases/queries/commands
  - Presentation: controllers, rotas/handlers, DTOs do transporte, validações/schemas
  - Infrastructure: adapters (ORM, HTTP clients, cache), entidades DB, providers (Nest), mappers infra
  - Módulos Nest: wiring e DI

1.2. Catalogar endpoints/transportes
- Listar os pontos de entrada (ex.: api/<feature>.controller.ts e *.routes.tsp):
  - Métodos HTTP, paths, nomes de handlers, DTOs de request/response, validações utilizadas
  - Middlewares/guards/interceptors específicos

1.3. Identificar dependências e acoplamentos
- Imports cruzados com outras features (ex.: Aula/Diario/Turma/Reserva), e com shared/
- Dependências de infraestrutura (ex.: TypeORM DataSource, entidades, providers)

1.4. Extrair contratos de borda e de aplicação
- Levantar portas (ports) esperadas pela aplicação (se inexistentes, anotar lacunas)
- Levantar DTOs de entrada/saída usados nos handlers atuais

1.5. Informações de documentação e schema
- Swagger/OpenAPI (decorators), esquemas de validação, operationIds, descriptions

1.6. Testes e cobertura atual
- Listar testes que cobrem a feature (unit/integration/e2e) e seus alvos

1.7. Saída (metadados consolidados)
- Tabela/lista (mental ou artefato) com:
  - Arquivo → papel → destino na nova estrutura
  - Endpoints → handler → DTOs → schemas → authorization
  - Ports → adapters existentes/necessários
  - Entidades/ORM → repositórios/adapters → providers

=====================================================================
2) MIGRAÇÃO DA ESTRUTURA ANTIGA PARA A NOVA
=====================================================================
Objetivo: reorganizar arquivos/pastas, introduzir camadas/ports quando necessário,
sem alterar comportamento funcional.

2.1. Layout alvo (baseado em "estado")
features/<feature>/
  application/
    dtos/
    errors/
    ports/
    queries/ (ou use-cases/commands, conforme necessário)
    <feature>-application-service.ts
    index.ts
  infrastructure/
    persistence/
      typeorm/
        entities/
          <feature>.database-entity.ts         (se houver)
        repositories/
          <feature>.repository.adapter.ts      (implementa ports)
        mappers/                               (opcional)
        utils/                                 (apenas se específicos da feature)
      index.ts
    providers/
      <feature>.repository.provider.ts         (wiring Nest fino)
      index.ts
    cache|messaging|search|http-clients/       (se aplicável)
    index.ts
  presentation/
    rest/
      nestjs/
        <feature>.controller.ts
      routes/
        <endpoints>.route.ts
      schemas/
        <endpoints>.request.schema.ts
      dtos/
      mappers/
      authz/                                   (authorization a partir do request)
      docs/
      index.ts
    graphql|events/                            (se aplicável)
    index.ts
  <feature>.module.ts
  index.ts

2.2. Estratégia de migração (passos)
- 2.2.1. Criar esqueleto de diretórios conforme layout alvo.
- 2.2.2. Presentation (REST):
  - Mover controllers de api/ para presentation/rest/nestjs/.
  - Extrair handlers/rotas de *.routes.tsp para presentation/rest/routes/ em classes
    focadas em orquestração (sem regra de negócio).
  - Extrair schemas/DTOs de request/response, se existirem inline, para
    presentation/rest/schemas e presentation/rest/dtos.
  - Introduzir camada authz/ (ex.: <feature>-authorization.from-request.ts) para
    construir o AuthorizationPort a partir do request.
  - Adicionar docs/ para operation summaries se necessário.
- 2.2.3. Application:
  - Introduzir/ajustar ports (interfaces) que a apresentação chamará.
  - Consolidar DTOs de entrada/saída usados pelos casos de uso.
  - Criar <Feature>ApplicationService (coordenador dos casos de uso), queries e
    comandos conforme padrão de "estado".
- 2.2.4. Infrastructure:
  - Se houver acesso a dados, criar adapters de repositório (ex.: <Feature>RepositoryAdapter)
    que implementem os ports de application.
  - Entidades do ORM em persistence/typeorm/entities.
  - Providers NestJS finos em infrastructure/providers (apenas wiring de DI).
  - Mover utilitários compartilháveis para shared/ se aplicável (evitar acoplamento entre features).
- 2.2.5. Módulo da feature:
  - Ajustar <Feature>Module para prover ApplicationService, Providers de infra e
    registrar os Routes handlers e Controller.
- 2.2.6. Imports e barrels:
  - Atualizar imports para novos caminhos.
  - Criar index.ts locais por pasta para melhorar ergonomia (evitar barrels globais excessivos).
- 2.2.7. Documentação e decorators:
  - Reapontar ApiOperation/ApiRequestSchema dos controllers para referenciar
    propriedades estáticas dos routes e seus schemas.
- 2.2.8. Testes:
  - Atualizar/adição de testes unitários por camada (presentation routes, authz, application services, infra adapters).
  - Ajustar paths de import nos testes existentes.

2.3. Regras e Convenções
- Nomeação de arquivos: kebab-case com sufixos relevantes (.route.ts, .controller.ts,
  .adapter.ts, .provider.ts, .database-entity.ts, .schema.ts).
- Dependências unidirecionais: presentation → application → (ports) ← infrastructure.
- Zero lógica de negócio na presentation e nos providers Nest (providers só fazem wiring).

2.4. Segurança da migração
- Realizar a migração em commits pequenos (por diretório/camada).
- Garantir que cada etapa compila e que testes relacionados passam antes de seguir.
- Manter alias/exports temporários se necessário para compatibilidade durante a transição.

2.5. Validação final
- Build do projeto sem erros de import.
- Execução de testes unitários/integrados relevantes.
- Verificação manual dos endpoints da feature comparando respostas antes/depois.
- Auditoria de dependências cruzadas removidas ou realocadas corretamente.

2.6. Automação futura (opcional)
- Script para:
  - Inventariar arquivos e sugerir destinos (dry-run).
  - Atualizar imports automaticamente (codemod com ts-morph/jscodeshift).
  - Gerar skeleton de routes/schemas/ports a partir dos metadados.

=====================================================================
3) ESTRUTURA DE REFERÊNCIA ATUAL (estado e cidade)
=====================================================================
Objetivo: Fixar um snapshot da estrutura atual de "estado" e "cidade" para servir de base na migração de qualquer feature.

3.1. Feature "estado" (snapshot observado)
packages/service/lib/features/estado/
  application/
    dtos/
    errors/
    ports/
    queries/
    schemas/
    services/
    index.ts
  infrastructure/
    persistence/
      typeorm/
        repositories/
          estado.repository.adapter.ts
    providers/
      estado.repository.provider.ts
  presentation/
    rest/
      nestjs/
        estado.controller.ts
      routes/
        estado-list.route.ts
        estado-find-one-by-id.route.ts
      schemas/
        ... (schemas por endpoint, exportados via index)
      dtos/
      mappers/
      authz/
      docs/
      index.ts
  estado.module.ts

Observações relevantes de uso:
- Controller (nestjs/estado.controller.ts) injeta handlers EstadoListRoute e EstadoFindOneByIdRoute.
- Decorators usam propriedades estáticas dos routes: ApiOperation e ApiRequestSchema.
- Module (estado.module.ts) registra ApplicationService, RepositoryProvider e os Routes.

3.2. Feature "cidade" (snapshot observado)
packages/service/lib/features/cidade/
  application/
    schemas/
      cidade-list.schema.ts
    ... (demais pastas conforme crescimento: dtos, ports, services)
  infrastructure/
    persistence/
      typeorm/
        repositories/
          endereco.repository.adapter.ts
  presentation/
    rest/
      schemas/
        cidade-list.request.schema.ts
    ... (demais pastas quando aplicável: nestjs, routes, dtos, mappers, authz)

3.3. Utilitários compartilhados utilizados pelas features
packages/service/lib/shared/base-entity/infrastructure/typeorm/base-entity-list.repository.provider.ts
packages/service/lib/infrastructure/persistence/typeorm/utils/
  create-aliases-generator.ts
  get-relation-paths.ts
  legacy/qb-efficient-load.ts
  index.ts

Diretriz: a migração de qualquer feature deve se alinhar ao padrão de "estado"; quando existirem peças já implementadas em "cidade" (ex.: schemas específicos), aproveite como referência de convenção e nomeação.

Fim do plano.
*/

/*
=====================================================================
4) PASSOS DETALHADOS (EXECUTÁVEIS MANUALMENTE) PARA MIGRAR QUALQUER FEATURE LEGADA POR CAMINHO
=====================================================================
Objetivo: Fornecer um roteiro menos abstrato, com passos técnicos e verificáveis, para migrar
uma feature legada (por exemplo, packages/service/lib/features/<feature-legacy>) para o
padrão atual (referência: "estado" e convenções já vistas em "cidade").

IMPORTANTE: Este bloco continua sendo apenas um plano. Não traz implementação.

Entradas (inputs) e pré-condições
- INPUT: LEGACY_FEATURE_PATH (ex.: packages/service/lib/features/<feature>)
- Pré-condições:
  - O repositório compila antes da migração (baseline estável)
  - Você tem visão do padrão alvo (estado/cidade) e dos utilitários compartilhados
- Saída esperada:
  - Nova estrutura criada sob packages/service/lib/features/<feature>/ conforme padrão
  - Código e imports reescritos/movidos para a nova estrutura (ou plano pronto para executar)
  - Módulo Nest atualizado com providers/handlers/controllers no novo layout

4.1. Descoberta e inventário (semi-automático)
- 4.1.1. Mapear arquivos do caminho legado:
  - Listar arquivos .ts, .tsx, .tsp, .json, .yaml sob LEGACY_FEATURE_PATH
  - Classificar por papel provável (api/, controllers, routes, domain, services, repositories, entities, schemas)
- 4.1.2. Endpoints e controllers:
  - Identificar controllers Nest (decorators @Controller, @Get/@Post...) e seus métodos
  - Identificar handlers/rotas auxiliares (arquivos *.route.ts, *.routes.tsp, pastas rest/graphql)
- 4.1.3. Schemas/DTOs/Typespec:
  - Localizar arquivos *.schema.ts, *.dto.ts, *.tsp (TypeSpec)
  - Anotar referências cruzadas (quem importa quem)
- 4.1.4. Infraestrutura:
  - Identificar adapters (TypeORM, cache, messaging), entidades DB e providers Nest (Provider tokens)
- 4.1.5. Application/Domain:
  - Identificar ports/interfaces, services (application-), models e regras puras (domain-)
- 4.1.6. Saída do inventário: checklist dos artefatos com papel → destino (target path)

4.2. Extração de metadados com ferramentas (sem executar, apenas passos)
- 4.2.1. TypeScript (ts-morph):
  - Carregar Project apontando para tsconfig.json
  - Para cada arquivo .ts/.tsx no LEGACY_FEATURE_PATH:
    - Ler SourceFile e extrair:
      - Decorators Nest (@Controller/@Get/@Post etc.) e seus argumentos (paths)
      - Exported classes com sufixos Controller, Route, Service, Provider, Adapter
      - Imports e import specifiers para mapear dependências internas/externas
      - Uso de tokens (ex.: ESTADO_REPOSITORY) e interfaces (ports)
    - Construir um grafo: arquivo → exports/imports → papel
  - Localizar módulos Nest (@Module), providers e controllers registrados
- 4.2.2. TypeSpec (@typespec/compiler):
  - Carregar program para arquivos .tsp sob LEGACY_FEATURE_PATH
  - Inspecionar namespaces, models, operations, decorators @route, @get, @post
  - Mapear operations para endpoints REST (rota, método, input/output models)
  - Relacionar models/operations às rotas/handlers previstos no target

4.3. Definição de mapeamentos (legacy → target) baseados no padrão estado/cidade
- 4.3.1. Presentation/REST:
  - Controllers Nest → presentation/rest/nestjs/<feature>.controller.ts
  - Rotas/handlers (routes) → presentation/rest/routes/*.<endpoint>.route.ts
  - Schemas de request → presentation/rest/schemas/*.<endpoint>.request.schema.ts
  - Mappers/DTOs → presentation/rest/{mappers,dtos}
  - AuthZ por request → presentation/rest/authz/<feature>-authorization.from-request.ts
  - Docs → presentation/rest/docs/
- 4.3.2. Application:
  - Services de caso de uso → application/services/<feature>-application-service.ts
  - Ports → application/ports/
  - DTOs, Schemas (de aplicação) → application/{dtos,schemas}
  - Queries/Commands → application/{queries,commands}
- 4.3.3. Infrastructure:
  - Repositórios adapters → infrastructure/persistence/typeorm/repositories/
  - Entidades ORM → infrastructure/persistence/typeorm/entities/
  - Providers Nest (fino) → infrastructure/providers/
  - Utils específicos da feature → infrastructure/persistence/typeorm/utils/
  - Utils compartilháveis → packages/service/lib/infrastructure/... ou shared/
- 4.3.4. Módulo da feature:
  - <Feature>Module provisiona: ApplicationService, Providers de infra, Routes e Controller

4.4. Plano de operações em arquivos (sequência sugerida, com checkpoints)
- 4.4.1. Criar skeleton de diretórios alvo, sem mover nada ainda
- 4.4.2. Gerar placeholders (arquivos vazios) onde necessário para guiar a migração
- 4.4.3. Mover controllers de api/ → presentation/rest/nestjs/
- 4.4.4. Para .routes.tsp (TypeSpec) ou rotas inline:
  - Definir um arquivo por endpoint em presentation/rest/routes/
  - Copiar/colar a orquestração mínima de handler, sem regra de negócio
  - Referenciar schemas via propriedades estáticas (operation, requestSchema)
- 4.4.5. Extrair schemas de request para presentation/rest/schemas/
- 4.4.6. Application:
  - Criar ports necessários e o <Feature>ApplicationService
  - Redirecionar controladores/rotas para chamar ApplicationService via ports/DTOs
- 4.4.7. Infrastructure:
  - Criar Adapter de repositório implementando o port
  - Criar Provider Nest fino que injeta DataSource (ou dependência) e retorna Adapter
- 4.4.8. Atualizar <Feature>Module com providers/handlers/controllers novos
- 4.4.9. Criar/atualizar index.ts (barrels) locais por pasta para ergonomia de import

4.5. Reescrita de imports e referências (com ts-morph, apenas como passos)
- 4.5.1. Para cada SourceFile envolvido:
  - Recalcular import paths relativos/alias conforme novo destino
  - Atualizar import declarations mantendo nomes e tipos
  - Ajustar símbolos reexportados nos index.ts locais
- 4.5.2. Atualizar decorators dos controllers:
  - ApiOperation e ApiRequestSchema passam a apontar para propriedades estáticas dos routes
- 4.5.3. Atualizar tokens e providers:
  - Verificar que os tokens (ex.: FEATURE_REPOSITORY) apontam para os novos providers

4.6. Integração com TypeSpec (quando .tsp presente)
- 4.6.1. Usar @typespec/compiler para extrair operations/models
- 4.6.2. Mapear cada operation para um arquivo .route.ts correspondente
- 4.6.3. Converter models de request em schemas TypeBox/Zod (ou padrão vigente) sob presentation/rest/schemas
- 4.6.4. Manter origem .tsp como verdade de documentação, se aplicável, com referência nos docs/

4.7. Validação incremental (dry-run antes do move definitivo)
- 4.7.1. Dry-run: gerar somente um relatório das mudanças planejadas (arquivos → novos caminhos)
- 4.7.2. Check de compilação: após cada bloco mover/ajustar, executar build local
- 4.7.3. Smoke tests: invocar handlers principais com dublês (se aplicável)
- 4.7.4. Comparar respostas dos endpoints antes/depois (contratos essenciais)

4.8. Estratégia de rollback
- 4.8.1. Commit granulado por pasta/camada
- 4.8.2. Preservar cópias temporárias durante o dry-run; apagar após validação
- 4.8.3. Se build quebrar, reverter último bloco e ajustar mapeamento

4.9. Casos especiais e decisões
- 4.9.1. Múltiplos transportes (REST/GraphQL/Events): isolar em subpastas próprias sob presentation/
- 4.9.2. CQRS: separar ports/adapters de leitura e escrita; providers distintos
- 4.9.3. Dependências compartilhadas: mover utils genéricos para shared/infra; evitar acoplamento entre features
- 4.9.4. Entidades legadas com divergência de shape: introduzir mappers infra (entities → DTOs)
- 4.9.5. Rotas com autorização complexa: extrair authz/ e padronizar contrato do AuthorizationPort
- 4.9.6. Paths por alias (ex.: @/features/...): garantir que tsconfig paths cobrem os novos diretórios

4.10. Entregáveis ao final
- Nova árvore de diretórios padronizada
- Controllers enxutos, rotas testáveis, schemas separados
- Application com ports/DTOs claros; infra em adapters/providers finos
- Módulo da feature atualizado e compilando
- Lista de pendências (se alguma regra de negócio ainda estiver na presentation)

4.11. Possível automação (futuro) com ts-morph/@typespec/compiler
- Com ts-morph:
  - Localizar e reescrever import declarations em massa
  - Gerar arquivos index.ts com reexports consistentes
  - Produzir classes base de Route com propriedades estáticas operation/requestSchema
- Com @typespec/compiler:
  - Gerar metadata de endpoints e modelos para scaffold automático de routes/schemas
  - Validar consistência entre .tsp e schemas gerados

FIM DOS PASSOS DETALHADOS
*/

/*
=====================================================================
5) EXECUÇÃO POR IA — PLANO OPERACIONAL DETERMINÍSTICO
=====================================================================
Objetivo: Adaptar este plano para execução por um agente de IA, sem ambiguidade, cobrindo
inputs, saídas, invariantes, heurísticas, árvores de decisão, templates, validações,
recuperação de falhas e estratégia de retomada (resume). Nenhum código deve ser gerado aqui.

5.1. Modelo de Execução do Agente
- Modo: iterativo e idempotente, em ciclos (descoberta → planejamento → dry-run → aplicação → validação).
- Operações permitidas: ler/escrever/mover arquivos sob o repositório; atualizar imports; criar
  novos arquivos; editar Nest modules; nunca excluir sem cópia/backup quando marcado.
- Sem dependências externas obrigatórias. Se ts-morph/@typespec/compiler estiverem instalados,
  podem ser usados; caso contrário, cair para heurísticas textuais descritas abaixo.
- Níveis de operação:
  1) Dry-run (somente relatório de mudanças propostas, nenhuma alteração em arquivo fonte)
  2) Apply (aplica mudanças atômicas por blocos; cada bloco validado antes do próximo)

5.2. Entradas formais
- LEGACY_FEATURE_PATH: caminho absoluto/relativo da feature legada (ex.: packages/service/lib/features/<feature>)
- TARGET_FEATURE_NAME: nome da feature alvo (ex.: "estado" ou "cidade"). Se omitido, derive do nome da pasta final do LEGACY_FEATURE_PATH.
- TRANSPORTES_ATIVOS: ["rest" | "graphql" | "events" ...]; padrão: ["rest"].
- ORM_PRESENTE: boolean (se existem entidades/repositórios). Se desconhecido, auto-detectar.
- DRY_RUN: boolean. Padrão true para primeira passagem.
- BACKUP_DIR: diretório para cópias/artefatos de relatório em dry-run (padrão: volumes/migration-backups/<feature>-<timestamp>/).

5.3. Saídas formais
- Relatório JSON e Markdown em BACKUP_DIR com:
  - inventário de arquivos e papéis inferidos,
  - mapeamento legacy → target (por arquivo),
  - plano de operações (ordem, ações),
  - resultados de validação (antes/depois),
  - diffs textuais por arquivo (apply),
  - pendências/manuais.
- Árvore final de diretórios criada em packages/service/lib/features/<TARGET_FEATURE_NAME>/ conforme padrão estado.
- Código ajustado com imports consistentes e módulo Nest funcional.

5.4. Invariantes e Regras Globais
- Nunca mover lógica de negócio para presentation; presentation orquestra e valida apenas.
- Providers NestJS são finos: apenas wiring/DI; sem queries.
- Dependências unidirecionais: presentation → application (ports, DTOs) e infrastructure → application.
- Nomenclatura e sufixos conforme seção 2.3 (kebab-case + sufixos).
- Não introduzir dependência cruzada entre features. Utils genéricos vão para shared/ ou infra compartilhada.
- Commits/blocos pequenos e validados (mesmo que o agente IA aplique em memória, a lógica deve respeitar checkpoints).

5.5. Árvore de Decisão para Classificação de Arquivos
Para cada arquivo sob LEGACY_FEATURE_PATH, aplique em ordem (primeiro match vence):
1) Se path inclui "/api/" e contém decorators Nest (@Controller/@Get/@Post/@Put/@Delete): papel = presentation/rest/nestjs controller.
2) Se filename termina com ".routes.tsp" ou contém decorators TypeSpec (@route/@get/@post): papel = fonte de contrato; mapear para presentation/rest/routes + schemas.
3) Se filename termina com ".route.ts":
   - papel = presentation/rest/routes handler.
4) Se filename termina com ".schema.ts" ou contém objetos TypeBox/Zod claramente exportados: papel = schema; destino presentation/rest/schemas quando request schema do transporte; se de aplicação, application/schemas.
5) Se filename termina com ".dto.ts":
   - Se for transporte (ex.: contém referências a IRequestRepresentation): presentation/rest/dtos.
   - Caso contrário: application/dtos.
6) Se contém @Entity (TypeORM) ou Repository/QueryBuilder explícitos: 
   - @Entity → infrastructure/persistence/typeorm/entities.
   - QueryBuilder/Repository e implementa port → infrastructure/persistence/typeorm/repositories.
7) Se exporta Provider Nest (objeto com provide/useFactory/inject): infrastructure/providers.
8) Se é service de caso de uso (ex.: <Feature>ApplicationService, usa ports): application/services.
9) Se é domain model/serviço puro (sem Nest/TypeORM): domain/ (se a feature tiver domínio explícito). Caso o projeto esteja migrando para application-only, manter em application com sufixo domain-model.
10) Se não classificável pelas regras acima: marcar como "manual-review" e não mover em Apply; apenas relatar.

5.6. Regras de Mapeamento Concretas (legacy → target)
- api/<feature>.controller.ts → presentation/rest/nestjs/<feature>.controller.ts
- *.routes.tsp → para cada operation:
  - presentation/rest/routes/<operation-kebab>.route.ts (classe <Feature><Operation>Route)
  - presentation/rest/schemas/<operation-kebab>.request.schema.ts
  - Referenciar operation metadata como propriedade estática na classe Route: operation, requestSchema
- domain/*.service.ts que contém lógica de caso de uso que conversa com repos → mover para application/services/<feature>-application-service.ts; se multi-casos, dividir métodos dentro do service inicialmente, mantendo uma classe.
- Repositórios/Query code → infrastructure/persistence/typeorm/repositories/<feature>.repository.adapter.ts implementando <IFeatureRepositoryPort>.
- Providers → infrastructure/providers/<feature>.repository.provider.ts expondo token <FEATURE_REPOSITORY> do application/ports.
- Módulo: <Feature>.module.ts deve listar ApplicationService, Provider(s), Routes, Controller.

5.7. Geração de Nomes e Templates
- Classe de Route: <Feature><Action>Route. Exemplo: EstadoListRoute, CidadeFindOneByIdRoute.
- Arquivo de rota: <feature>-<action>.route.ts (kebab-case).
- Controller Nest: <Feature>Controller em presentation/rest/nestjs/<feature>.controller.ts com endpoint base /base/<plural> (alinha com estado; ajustar plural conforme recurso).
- Provider token: <FEATURE>_REPOSITORY; interface em application/ports.
- Templates de arquivos (marcadores entre [BRACKETS] devem ser resolvidos pelo agente):

Template Route:
// presentation/rest/routes/[feature]-[action].route.ts
import { [Feature]ApplicationService } from "@/features/[feature]/application/services/[feature]-application-service";
import { type IRequestRepresentation } from "@/infrastructure/adapters/http/request-representation";
import { [RequestSchema] } from "@/features/[feature]/presentation/rest/schemas";
import { ApiOperationObject } from "@nestjs/swagger";

export class [Feature][Action]Route {
  static operation: ApiOperationObject = { summary: "[summary]" };
  static requestSchema = [RequestSchema];
  constructor(private app: [Feature]ApplicationService) {}
  async handler(req: IRequestRepresentation) { // orquestracao minima
  }
}

Template Controller:
// presentation/rest/nestjs/[feature].controller.ts
import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ApiRequestSchema } from "@/infrastructure/integrations/nestjs/api-request-schema.decorator";
import { [Feature][Action]Route } from "@/features/[feature]/presentation/rest/routes/[feature]-[action].route";

@ApiTags("[plural]")
@Controller("/base/[plural]")
export class [Feature]Controller {
  constructor(private [feature][Action]Route: [Feature][Action]Route) {}
  @Get("/")
  @ApiOperation([Feature][Action]Route.operation)
  @ApiRequestSchema([Feature][Action]Route.requestSchema)
  async [feature][action](req) { return this.[feature][Action]Route.handler(req); }
}

Template Provider:
// infrastructure/providers/[feature].repository.provider.ts
import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { [FEATURE]_REPOSITORY, I[Feature]RepositoryPort } from "@/features/[feature]/application/ports";
import { [Feature]RepositoryAdapter } from "@/features/[feature]/infrastructure/persistence/typeorm/repositories/[feature].repository.adapter";
export const [Feature]RepositoryProvider: Provider<I[Feature]RepositoryPort> = {
  provide: [FEATURE]_REPOSITORY,
  inject: ["APP_DATA_SOURCE_TOKEN"],
  useFactory: (ds: DataSource) => new [Feature]RepositoryAdapter(ds),
};

5.8. Procedimento de Execução (pseudo-roteiro)
1) Coletar entradas. Se LEGACY_FEATURE_PATH inexistente → abortar com relatório.
2) Inventário: listar todos os arquivos; classificar via 5.5; produzir inventário.json.
3) Planejamento: gerar mapping.json legacy→target e plano por etapas (create dirs, copy/move, edit imports, update module).
4) Dry-run: gerar diffs simulados, lista de novos arquivos, mudanças de imports, e checagens esperadas.
5) Apply em blocos:
   - Bloco A: criar diretórios alvo e index.ts vazios.
   - Bloco B: mover controller(es) e ajustar imports locais.
   - Bloco C: gerar skeleton das rotas a partir de .routes.tsp e/ou controllers (se não existirem), e schemas.
   - Bloco D: application (ports, service, dtos/schemas). Criar interfaces/tokens faltantes.
   - Bloco E: infrastructure (adapter + provider). Ajustar imports de TypeORM.
   - Bloco F: atualizar <Feature>Module (providers, routes, controller).
6) Após cada bloco: validação rápida (compilação estática de imports/exports por análise textual; se toolchain disponível, rodar tsc --noEmit).
7) Final: validação completa (estrutura, referências, exemplos de endpoints conforme controller/rotas).

5.9. Heurísticas de Detecção (quando ts-morph não disponível)
- Detectar Controller: arquivo contém "@Controller(" e export class <X>Controller.
- Detectar rota TypeSpec: termina com .tsp e contém "@route" ou "op " com "@get/@post".
- Detectar schema TypeBox: import de "@sinclair/typebox" e uso de Type.Object/Type.String.
- Detectar adapter ORM: uso de DataSource/Repository/QueryBuilder de "typeorm" com queries.
- Detectar provider Nest: objeto export const <Name>Provider com provide/useFactory.

5.10. Regras de Reescrita de Imports
- Preferir alias "@/features/..." quando já usado no repo; manter consistência com estado.
- Controllers devem importar rotas por caminhos sob presentation/rest/routes.
- Rotas importam ApplicationService e IRequestRepresentation do adapter http.
- Infrastructure importa tokens/ports de application.
- Atualizar barrels (index.ts) locais por pasta com export * para sub-itens relevantes.

5.11. Validações (Gates) e Auto-Fix
- Gate G1: árvore de diretórios alvo criada com pastas mínimas: application/, infrastructure/{persistence/providers}, presentation/rest/{nestjs/routes/schemas}.
- Gate G2: todos os arquivos classificados possuem destino. Os "manual-review" foram registrados em relatório.
- Gate G3: Controller(s) referenciam rotas com propriedades estáticas operation/requestSchema.
- Gate G4: <Feature>Module contém ApplicationService, Provider(s), Routes, Controller.
- Gate G5: Nenhum import inválido (heurística: verificar se os paths existem). Auto-fix: corrigir paths relativos/alias.
- Gate G6: Providers não importam presentation; rotas não importam ORM; circular deps inexistentes.
- Gate G7: Schemas de request existem para endpoints REST públicos; se ausente, gerar placeholder e marcar TODO.

5.12. Estratégia de Rollback e Resume
- Rollback: ao falhar em um gate, reverter o bloco corrente usando cópias temporárias criadas antes do bloco.
- Resume: armazenar progresso em BACKUP_DIR/progress.json (último bloco concluído). Ao reiniciar, continuar do próximo bloco.
- Idempotência: reaplicar um bloco não deve duplicar arquivos; checar existência e comparar conteúdo antes de escrever.

5.13. Políticas de Conflito
- Se arquivo destino já existe:
  - Se conteúdo idêntico: pular.
  - Se diferente: salvar como <name>.conflicted.ts ao lado e registrar no relatório.
- Se token/provider já existente com nome diferente: preferir nome padronizado e marcar o antigo como deprecado no relatório sem excluir.

5.14. Exemplo Concreto (ambiente)
- LEGACY_FEATURE_PATH=packages/service/lib/features/ambiente
- Detectar: api/ambiente.controller.ts → controller; api/ambiente.routes.tsp → contratos; domain/ambiente.service.ts → candidata a ApplicationService.
- Criar: features/ambiente/presentation/rest/nestjs/ambiente.controller.ts (mover); features/ambiente/presentation/rest/routes/ambiente-list.route.ts (exemplo) e schemas correlatos; application/services/ambiente-application-service.ts; application/ports e tokens; infrastructure/persistence/typeorm/repositories/ambiente.repository.adapter.ts (se necessário) e providers.
- Atualizar: features/ambiente/ambiente.module.ts listando providers/rotas/controller novos.

5.15. Checklist Final para o Agente
- [ ] Inventário gerado e salvo no BACKUP_DIR
- [ ] Mapping legacy→target válido para 100% dos arquivos classificáveis
- [ ] Diretórios alvo criados
- [ ] Controller(s) movidos e atualizados
- [ ] Rotas e Schemas criados/extraídos com propriedades estáticas
- [ ] ApplicationService + ports/tokens criados
- [ ] Infra adapters + providers criados (se ORM)
- [ ] Módulo atualizado
- [ ] Imports verificados/corrigidos
- [ ] Purga de lixo e estruturas legadas concluída (remoção de *.tsp e arquivos .ts que não sigam o foco atual/estrutura alvo; nenhum arquivo remanescente em api/, domain/*.tsp, ou diretórios obsoletos)
- [ ] Conformidade final: verificação contra Regras Globais (Seção 5.4) e Gates (Seção 5.11), todos “aprovado”
- [ ] Relatório final com diffs e pendências

Fim da seção 5 (Execução por IA).
*/

/*
=====================================================================
6) REGRAS AVANÇADAS: REUTILIZAÇÃO, FLAGS E CASOS ESPECIAIS
=====================================================================
Objetivo: Detalhar regras para maximizar reuso de código, introdução de feature flags
(através de argumentos/parâmetros), e tratar módulos com particularidades, como
service-only (ex.: "endereço") e módulos com upload/download de arquivos.

6.1. Princípios de DDD, Feature-first e Clean Code (ênfase)
- Feature-first: todo artefato da feature vive sob packages/service/lib/features/<feature>/.
- Clean Architecture:
  - presentation: orquestração e validação; sem negócio.
  - application: casos de uso, DTOs, ports; sem tecnologia.
  - infrastructure: adapters de tecnologia que implementam ports; sem decorators de apresentação.
- Clean Code: classes/funções pequenas, nomes claros, responsabilidade única, dependências explícitas.

6.2. Política de REUSO e Feature Flags
- Reusar ao máximo:
  1) Procurar utilitários, funções, mapeadores, providers já existentes em shared/ ou em outras features.
  2) Se encontrar função semelhante:
     - Avaliar viabilidade de generalização por argumento (feature flag/param), sem quebrar o contrato existente.
     - Ex.: efficientJoinAndSelect(query, selection, { allowLeftJoins: true })
  3) Se a função for muito específica, duplicação consciente com TODO para convergir em shared/ no futuro.
- Feature flags (parâmetros) vs. forks:
  - Preferir parâmetros explícitos (options objects) com default preservando comportamento atual.
  - Evitar configurar flags por ambiente; flags aqui significam opções de função/adaptador.
- Procedimento do agente:
  - Antes de criar novo utilitário, buscar por nome/similaridade em:
    packages/service/lib/shared/
    packages/service/lib/infrastructure/
    packages/service/lib/features/**/ infrastructure; /**/
utils - Se;
reusar, registrar;
no;
relatório;
qual;
util;
foi;
adotado.Se;
criar, justificar.

(6.3).Casos;
Especiais;
— Módulos Service-only (ex.: "endereço")
- Descrição: Não expõem rotas REST públicas
atuam
como;
provedores;
de;
serviços;
para;
outras;
features.
- Mapeamento
alvo:
  - presentation/
: pode estar ausente ou conter somente adaptadores internos (p.ex., events/graphql se aplicável).
  - application/: mantém services/ports/DTOs como fonte de verdade da API interna da feature.
  - infrastructure/: providers/adapters necessários (repos, http-clients, etc.).
  - <Feature>.
module.ts;
: exporta explicitamente os serviços/ports que outras features consomem.
- Regras
do módulo Nest (service-only)
:
  - Exports: [<Feature>ApplicationService, Tokens de ports necessários]
  - Controllers: nenhum controller REST público.
- Heurística de detecção (5.5 complementada):
  - Se não há
@Controller
REST;
público;
em;
api / nem;
rotas;
configuradas;
→ classificar como service-only.
  - Se houver controller mas apenas métodos marcados como internos (ex.: prefixo /internal ou uso somente em outros módulos), tratar como transportes internos ou considerar refactor para application-only exposto por providers.
- Validações (Gates adicionais):
  - G8: <Feature>Module não declara controllers REST quando classificado como service-only.
  - G9: Exports corretos para consumo inter-feature (ports/services).

6.4. Casos Especiais — Upload/Download de Arquivos
- Objetivo: Preservar comportamentos atuais de upload/download, adaptando ao novo desenho.
- Contratos de Application (ports):
  - Criar/adaptar IFileStoragePort (se não existir em shared/):
interface IFileStoragePort {
  upload(params: { path: string; data: NodeJS.ReadableStream | Uint8Array; contentType?: string; metadata?: Record<string, string> }): Promise<{ url?: string; etag?: string; size?: number }>;
  download(params: { path: string; range?: { start: number; end?: number } }): Promise<{ stream: NodeJS.ReadableStream; contentType?: string; size?: number; metadata?: Record<string, string> }>;
  delete?(path: string): Promise<void>;
}
-Expor;
tokens;
na;
application/ports (ex.: FILE_STORAGE)
e;
injetar;
em;
ApplicationService.
- Presentation/REST (quando houver endpoints públicos)
:
  - Rotas de upload: presentation/rest/routes/<feature>-upload.route.ts
    - Handler deve:
      1) Validar autorização e inputs (filename, mime, etc.).
      2) Obter stream
do arquivo (ex.: via @UploadedFile) e
repassar;
para;
ApplicationService.
3;
) Retornar metadados (url, etag, size) sem expor detalhes
do provider.
  - Rotas de
download: <feature>-download.route.ts - Handler;
deve: 1;
) Validar autorização.
      2) Pedir ao ApplicationService o download (stream) via port.
      3) Retornar como StreamableFile, setando headers de content-
type, content-length, content-disposition.
  - Observação
: manter suporte a faixa (range) se já existir.
- Infrastructure:
  - Criar adapters para storage (ex.: S3, FS) em infrastructure/
{
  (http - clients) | persistence;
}
/   -.;Paaaddeeegiooprrrrsssttv;
finos;
para;
injetar;
opções (ex.: bucket, basePath)
via;
useFactory;
com;
config.
- Reuso
e;
flags: -Se;
já;
existir;
um;
FileStoragePort;
em;
shared/, preferir
reuso.
  - Se
houver;
adapter;
semelhante;
em;
outra;
feature, avaliar;
extrair;
para;
shared / com;
parâmetro;
basePath/bucket.
- Heurística
de;
detecção (5.5 complementada)
:
  - Upload: uso de
@UploadedFile
/      ,,,,-...;@DFMSUaaaacddddeeeeeeeeeeegiiillllllmmmnooooopppprrrrrsssssttttuuuvwxy;
: uso de StreamableFile, res.download, headers content-
type / content - length, read;
streams.
- Gates
adicionais: -G10;
: Endpoints de upload/download presentes antes da migração continuam existindo após a migração, com contrato compatível.
  - G11: Nenhum vazamento de detalhes
do storage provider
pela;
presentation.

(6.5).Ajustes;
em;
Entradas / Saídas;
e;
Planejamento (Seção 5)
- Entradas
adicionais(5.2);
:
  - SERVICE_ONLY: boolean | auto (default: auto) — força classificação service-only.
  - FILE_IO:
{
  upload?: boolean;
  download?: boolean
}
| auto — orienta criação de ports/rotas/adapters.
- Planejamento (5.8) — novos blocos/ramificações:
  - Se SERVICE_ONLY=true:
    - Pular blocos de presentation/rest
focar
em;
application;
e;
infrastructure;
certificar;
exports;
do módulo.
  - Se FILE_IO.upload/download
verdadeiros: -Incluir;
geração / ajuste;
de;
ports;
de;
file;
storage;
e;
adapters.
    - Incluir
rotas;
REST;
somente;
se;
TRANSPORTES_ATIVOS;
incluir;
("rest");
e;
o;
módulo;
não;
for service-only.

6.6. Exemplo Concreto
— "endereço" (service-only)
- Detecção: ausência de controllers REST públicos
presença
endereco.entity;
de;
domain / endereco.service.ts;
consumido;
por;
outras;
features.
- Ações
:
  - Criar application/services/endereco-application-service.ts agregando operações.
  - Definir ports necessários (ex.: repositórios, storage se houver imagens/anexos internos).
  - Infrastructure: providers/adapters correspondentes.
  - Module: exportar EnderecoApplicationService e tokens de ports. Sem controllers REST.

6.7. Documentação e Comunicação de Mudanças
- Documentar no relatório final:
  - Reusos aplicados (arquivo/origem → destino), opções/flags usadas.
  - Quais endpoints de upload/download foram preservados e como.
  - Justificativas para qualquer criação de utilitário novo em detrimento de reuso.

Fim da seção 6.
*/

/*
=====================================================================
7) POLÍTICA DE EXCLUSÃO DE LEGADO E VERIFICAÇÃO FINAL DE CONFORMIDADE
=====================================================================
Objetivo: Garantir que, ao final da migração, não reste nenhum arquivo, pasta ou
referência da estrutura antiga. O estado final deve refletir APENAS o padrão
canônico (referência: "estado" e, secundariamente, "cidade").

7.1. Regra-mestra (mandatória)
- Apagar TODO lixo e estrutura legada. Não manter:
  - Arquivos .tsp (TypeSpec) dentro da feature migrada.
  - Arquivos .ts que não sigam o foco/estrutura atual (ex.: antigos controllers em api/, rotas antigas, mappers/schemas fora das pastas padrão, provedores gordos etc.).
  - Pastas herdadas: api/, domain/*.tsp, quaisquer *_antigo/ dentro da feature.
  - Arquivos temporários de migração (*.bak, *.old, *.conflicted.ts) após a conciliação.

7.2. O que deve PERMANECER (pós-migração)
- Somente a estrutura alvo conforme Seção 2.1:
  features/<feature>/{application, infrastructure, presentation, <feature>.module.ts, index.ts}
  - presentation/rest/{nestjs, routes, schemas, dtos, mappers, authz, docs}
  - application/{services, ports, dtos, schemas, queries|commands, errors, index.ts}
  - infrastructure/{persistence/typeorm/{entities,repositories,mappers,utils}, providers, ...}
- Quaisquer utilitários realmente compartilháveis devem estar em shared/ ou infra compartilhada fora das features (se aplicável) — nunca referenciados de outra feature de forma cruzada.

7.3. Workflow seguro de exclusão (para o agente IA)
1) Dry-run de exclusão:
   - Gerar lista de candidatos a exclusão (legacy-delete.json) com caminhos e motivo (regra).
   - Salvar cópias/backup em BACKUP_DIR quando DRY_RUN=false e exclusão for aplicada.
2) Validação pré-exclusão:
   - Checar que os novos arquivos substitutos existem (rotas, schemas, services, providers, module atualizado).
   - Passar Gates G1–G7 da Seção 5.11.
3) Aplicar exclusão:
   - Remover arquivos/pastas listados em legacy-delete.json.
   - Remover referências residuais (imports para caminhos apagados), reescrevendo imports se necessário.
4) Validação pós-exclusão:
   - Build/cheque estático (tsc --noEmit, se disponível) e verificação heurística de imports.
   - Reexecutar Gates G1–G7 e Gates específicos do caso (G8–G11) — tudo deve estar “aprovado”.
   - Atualizar relatório final com o resultado e estatísticas de arquivos removidos.

7.4. Heurísticas de detecção de legado (candidatos a exclusão)
- Padrões de caminho:
  - .../features/<feature>/api/** (qualquer arquivo)
  - .../features/<feature>/domain/*.tsp (ex.: <feature>.model.tsp, <feature>.params.tsp)
  - .../features/<feature>/**/*.routes.tsp
  - .../features/<feature>/**/shared-antigo/**, **/infrastructure-antigo/**, **/shared-antigo /**
- Padrões de arquivo:
  - *.tsp (todos) dentro da feature migrada.
  - *.controller.ts fora de presentation/rest/nestjs/.
  - *.route.ts fora de presentation/rest/routes/.
  - *.request.schema.ts fora de presentation/rest/schemas/.
  - Providers que não estejam em infrastructure/providers/.
- Conteúdo indicativo:
  - Imports de "@/infrastructure-antigo" ou "@/shared-antigo" (migrar ou remover antes de excluir).
  - Controllers com decorators HTTP dentro de pastas antigas (api/ ou presentation sem rest/nestjs).
  - Arquivos que referenciem rotas/DTOs/schemas inexistentes no novo layout.

7.5. Exceções controladas
- Se a feature for service-only (Seção 6.3):
  - É esperado NÃO haver presentation/rest/**. Ainda assim, a exclusão do legado se aplica.
- Se houver múltiplos transportes ativos (GraphQL/Events):
  - Preservar apenas os adaptadores nos diretórios corretos (presentation/graphql, presentation/events) e excluir artefatos antigos fora desse padrão.

7.6. Lista de checagem de exclusão (adicionar ao relatório)
- [ ] Nenhum arquivo .tsp remanescente na feature.
- [ ] Nenhuma pasta api/ remanescente na feature.
- [ ] Nenhum *.controller.ts fora de presentation/rest/nestjs.
- [ ] Nenhum *.route.ts fora de presentation/rest/routes.
- [ ] Nenhum *.request.schema.ts fora de presentation/rest/schemas.
- [ ] Nenhum provider fora de infrastructure/providers.
- [ ] Nenhum import para caminhos apagados ou para *_antigo.
- [ ] Backups salvos (quando aplicável) e relatório legacy-delete.json emitido.

7.7. Verificação final de conformidade (OBRIGATÓRIA)
- Reexecutar as Regras Globais (Seção 5.4) e os Gates (Seção 5.11 e Gates adicionais 6.x) e registrar o resultado no relatório final.
- Garantir que o Módulo da Feature está coerente: exports corretos, controllers (se houver), providers e routes registrados — sem referências a artefatos removidos.
- Garantir que o padrão de dependências está respeitado (presentation → application; infrastructure → application; sem cruzamentos indevidos).
- Garantir naming e sufixos padronizados (Seção 2.3) e barrels locais consistentes.

7.8. Política de não-regressão
- Uma vez migrada e limpo o legado, é proibido reintroduzir .tsp ou estruturas antigas na feature.
- Novas alterações devem seguir o padrão estabelecido por "estado" e reforçado por "cidade".

Fim da Seção 7.
*/

/*
=====================================================================
ADENDO À SEÇÃO 7 — PURGAÇÃO DE LIXO PARA ENDEREÇO E AMBIENTE
=====================================================================
Atenção (mandatório): As estruturas ATUAIS das features "endereco" e "ambiente"
estão completamente erradas perante o padrão canônico (referência: "estado" e,
secundariamente, "cidade"). Portanto:

- Trate TODA a estrutura atual de packages/service/lib/features/endereco e
  packages/service/lib/features/ambiente como LEGADO a ser integralmente
  readaptado para o novo layout definido neste plano (Seções 2 e 3).
- Não preservar diretórios/padrões antigos dessas duas features (api/, arquivos .tsp,
  mapeadores/schemas fora de pastas padrão, providers gordos, etc.).
- Após migrar para o padrão canônico, APLIQUE a purgação (Seção 7.3) removendo os artefatos
  antigos dessas features, garantindo que apenas a nova estrutura permaneça.
- Valide a conformidade final (Seção 7.7), usando "estado" como referência primária
  de organização e "cidade" como referência secundária.

Observação: "endereco" é um caso service-only — não possui rotas REST públicas. A migração
DEVE manter essa característica (ver Seção 6.3), exportando seus serviços/ports via módulo,
sem criar controllers REST públicos.
*/

/*
=====================================================================
ADENDO MANDATÓRIO — ORDEM DE PURGA E INTEGRIDADE DE DOMÍNIO
=====================================================================
Este adendo altera e prevalece sobre quaisquer instruções anteriores quando houver
ambiguidade. Regras obrigatórias para toda migração:

A) Sequência de PURGA (limpeza) — Somente após replicação completa
1) É PROIBIDO apagar arquivos legados (.tsp, controllers em api/, rotas antigas, etc.)
   antes que o comportamento atual e os schemas atuais tenham sido integralmente
   replicados e validados na nova estrutura alvo (padrão "estado"/"cidade").
2) Exceção única: remoção antecipada somente é permitida quando o próprio arquivo
   legado for reaproveitado no novo layout (readaptado) e movido/reescrito mantendo
   seu comportamento e contrato. Nesses casos, a remoção refere-se ao caminho
   antigo após a realocação estar concluída.
3) As validações que liberam a purga são: Gates G1–G7 (Seção 5.11) + quaisquer Gates
   específicos do caso (G8–G11), além de compilar sem erros e manter contratos
   equivalentes em respostas. Consulte também a Seção 7.3 (workflow de exclusão).

B) Invariantes de DOMÍNIO — Não alterar regras ou estruturas
1) O comportamento de domínio, os schemas de aplicação e as estruturas de domínio
   DEVEM permanecer idênticos aos atuais. É terminantemente proibido modificar
   regras de negócio, modelos de domínio ou contratos de schemas.
2) A migração trata essencialmente de reorganização arquitetural (presentation,
   application, infrastructure) e de adaptação de borda (controllers/rotas/schemas
   de transporte), sem alterar o núcleo de domínio.
3) Caso seja detectada qualquer divergência de comportamento em testes ou inspeção,
   a mudança deve ser revertida e replanejada até manter equivalência funcional.

C) Checagem final obrigatória
1) Antes de acionar a purga (Seção 7), execute a Conformidade Final (Seção 5.15 e 7.7):
   - Comparação de respostas antes/depois; 
   - Verificação de imports e dependências; 
   - Garantia de que nenhuma regra de negócio foi deslocada para presentation/providers;
   - Preservação de tokens/ports e DTOs de aplicação.
2) Somente após essas checagens estarem aprovadas, proceder com a exclusão definitiva
   do legado.

Nota: Em caso de dúvida, siga "estado" como referência canônica e "cidade" como
referência secundária de convenções. Este adendo é obrigatório para qualquer feature,
incluindo casos service-only (ex.: endereço) e módulos com upload/download.
*/

/*
=====================================================================
ADENDO COMPLEMENTAR — REESCRITA OBRIGATÓRIA DE .TSP EM TYPEBOX
=====================================================================
Escopo: Este adendo é MANDATÓRIO e complementa a Seção 7 (purga) e o
“ADENDO MANDATÓRIO — ORDEM DE PURGA E INTEGRIDADE DE DOMÍNIO”.

1) Reescrita obrigatória em TypeBox
- Todos os schemas/contratos definidos em arquivos .tsp (TypeSpec) DEVEM ser
  reescritos em TypeBox, adotando o padrão vigente do repositório.
- Não utilizar Zod ou outras bibliotecas nesta migração; o padrão é TypeBox.

2) Destino dos novos schemas TypeBox
- Schemas de transporte (REST): colocar em
  packages/service/lib/features/<feature>/presentation/rest/schemas/
  - Um arquivo por endpoint, com sufixo .request.schema.ts (e .response.schema.ts
    quando aplicável), seguindo as convenções de "estado" e "cidade".
- Schemas de aplicação: colocar em
  packages/service/lib/features/<feature>/application/schemas/
  - Somente quando o schema for usado como contrato interno da aplicação
    (DTOs de casos de uso), separado de detalhes do transporte.

3) Mapeamento e equivalência
- Para cada model/operation no .tsp:
  - Criar TypeBox equivalente (Type.Object, Type.String, Type.Number, enums,
    arrays, unions/discriminators), replicando required/optional, defaults e
    constraints (minLength, format, etc.) quando existirem.
  - Incluir referências ($ref) e composição (allOf/oneOf) com as APIs
    adequadas do TypeBox mantendo a mesma semântica do contrato.
- Manter nomes, descrições e comentários úteis como JSDoc nos arquivos TypeBox.

4) Sequência e validação (antes de purgar .tsp)
- Reescrever → referenciar os novos schemas nos handlers/routes/controllers →
  validar Gates G1–G7 e compilar → comparar contratos (formas/required) →
  somente então executar a purga dos .tsp conforme Seção 7.3.
- Atualizar as checklists:
  - Seção 5.15: adicionar verificação de que "Todos os .tsp possuem
    equivalentes em TypeBox criados e referenciados".
  - Seção 7.6: além de "Nenhum arquivo .tsp remanescente", verificar o
    pareamento .tsp → TypeBox (relatório deve exibir a tabela de mapeamento).

5) Diretrizes de nomeação
- Arquivos: <endpoint>.request.schema.ts, <endpoint>.response.schema.ts
  (apenas quando existir payload de response específico), kebab-case.
- Exports nomeados: <Feature><Action>RequestSchema, <Feature><Action>ResponseSchema
  (ex.: EstadoListRequestSchema), seguindo o padrão observado.

6) Em caso de dúvida
- Usar "estado" como referência canônica e "cidade" como secundária sobre
  como organizar schemas em TypeBox, nomes, e onde referenciá-los nos routes.
*/
