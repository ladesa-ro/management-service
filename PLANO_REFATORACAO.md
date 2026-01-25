# Plano de Refatoração - Arquitetura Hexagonal

## 📋 Sumário Executivo

Este documento descreve o plano de refatoração gradual da aplicação para uma **arquitetura hexagonal (Ports & Adapters)** limpa, organizada e bem engenhada.

**Objetivo**: Refatorar todos os 41 módulos da aplicação de forma incremental, mantendo compatibilidade total com APIs externas e sem quebrar o sistema em nenhuma fase.

---

## 🔍 Estado Atual da Aplicação

### Módulos Identificados (41 total)

```
ambiente                 arquivo                  aula
autenticacao             autorizacao              bloco
calendario-letivo        campus                   cidade
common                   curso                    dia-calendario
diario                   diario-preferencia       diario-professor
disciplina               disponibilidade          endereco
estado                   etapa                    evento
gerar-horario            grade-horario-oferta     grade-horario-intervalo
health                   horario-gerado           horario-gerado-aula
imagem                   imagem-arquivo           intervalo-de-tempo
modalidade               nivel-formacao           oferta-formacao
oferta-formacao-nivel    perfil                   professor-indisponibilidade
reserva                  turma                    turma-disponibilidade
usuario
```

### Estado da Arquitetura Atual

#### ✅ **Já Implementado**
- **27 módulos** com `Repository Ports (Out)` criados
- **1 módulo (perfil)** totalmente refatorado com Use Case Port (In)
- Adapters de persistência TypeORM criados para 27 módulos
- Paginação genérica (`NestJsPaginateAdapter`) implementada

#### 🚧 **Necessita Refatoração**
- **40 módulos** sem Use Case Ports (In)
- Controllers misturados com DTOs em `adapters/in/http/{modulo}/`
- Services ainda acessam `DatabaseContextService` diretamente (alguns)
- DTOs espalhados em `adapters/in/http/{modulo}/dto/`
- Domain models existem apenas em **10 módulos** (perfil, campus, usuario, etc.)

---

## 🎯 Objetivo da Arquitetura Alvo

### Estrutura Final Desejada

```
app/lib/v2/
│
├── core/{modulo}/                          # CORE - Lógica de Negócio (puro, sem NestJS)
│   │
│   ├── domain/                             # Camada de Domínio
│   │   ├── {modulo}.types.ts               # Tipagem da entidade (interface/type)
│   │   ├── {modulo}.domain.ts              # Classe que implementa a tipagem
│   │   ├── value-objects/                  # Value Objects (quando aplicável)
│   │   └── validators/                     # Validações de domínio
│   │
│   └── application/                        # Camada de Aplicação
│       ├── ports/                          # Interfaces (contratos)
│       │   ├── in/                         # Portas de Entrada (Use Cases)
│       │   │   └── {modulo}.use-case.port.ts
│       │   └── out/                        # Portas de Saída (Repositórios)
│       │       └── {modulo}.repository.port.ts
│       │
│       ├── dto/                            # DTOs com validações
│       │   ├── {modulo}-create.dto.ts
│       │   ├── {modulo}-update.dto.ts
│       │   ├── {modulo}-find-one.dto.ts
│       │   └── {modulo}-list.dto.ts
│       │
│       └── use-cases/                      # Pasta de Use Cases
│           └── {modulo}.service.ts         # Centraliza toda lógica (por enquanto)
│
├── adapters/                               # ADAPTERS - Infraestrutura
│   ├── in/                                 # Adapters de Entrada
│   │   └── http/{modulo}/                  # Adaptadores HTTP
│   │       ├── {modulo}.controller.ts      # Controller REST
│   │       └── dto/                        # DTOs específicos HTTP (mantidos)
│   │
│   └── out/                                # Adapters de Saída
│       └── persistence/
│           └── typeorm/
│               ├── adapters/               # Repository Adapters
│               │   └── {modulo}-typeorm.repository.adapter.ts
│               └── entities/               # Entidades TypeORM
│                   └── {modulo}.entity.ts
│
└── server/                                 # SERVIDOR - Configuração e Bootstrap
    ├── modules/                            # Módulos NestJS (DI e wiring)
    │   └── {modulo}.module.ts              # Define providers e bindings
    └── main.ts                             # Bootstrap da aplicação
```

### Separação de Responsabilidades

| Camada | Localização | Responsabilidade |
|--------|-------------|------------------|
| **Domain** | `core/{modulo}/domain/` | Tipagens, classes de domínio, regras de negócio |
| **Application** | `core/{modulo}/application/` | Ports, DTOs, Services (use cases) |
| **Adapters** | `adapters/` | Controllers, Repository Adapters, Entidades TypeORM |
| **Server** | `server/modules/` | Módulos NestJS (injeção de dependência) |

### Princípios da Arquitetura

1. **Separation of Concerns**: Cada camada com responsabilidade clara
2. **Dependency Inversion**: Core não depende de adapters/server
3. **Type Safety**: Tipagem forte em todos os níveis (zero `any`)
4. **Testability**: Fácil criar mocks de ports para testes
5. **Clean Code**: Código organizado, legível e manutenível

---

## 📅 Fases de Refatoração

### **Estratégia Geral**

- ✅ Refatoração **gradual** e **incremental**
- ✅ **Zero breaking changes** em cada fase
- ✅ Sistema **sempre funcional** entre fases
- ✅ APIs REST **inalteradas** (compatibilidade externa)
- ✅ Fases **independentes** (podem ser pausadas/retomadas)

---

## FASE 1: Criar Use Case Ports (Ports In)

### 🎯 Objetivo
Criar interfaces de Use Case (Ports In) para todos os 41 módulos, definindo contratos claros de entrada.

### 📝 Descrição
- Criar arquivo `{modulo}.use-case.port.ts` em `core/{modulo}/application/ports/in/`
- Definir interface com todos os métodos públicos do service
- **NÃO alterar** services ainda (apenas criar interface)
- Manter compatibilidade 100% com comportamento atual

### ✅ Checklist de Módulos

#### Grupo 1: Módulos Base (5 módulos)
- [ ] `estado` - Estado (sem dependências)
- [ ] `cidade` - Cidade (depende: estado)
- [ ] `modalidade` - Modalidade (sem dependências)
- [ ] `nivel-formacao` - Nível de Formação (sem dependências)
- [ ] `endereco` - Endereço (depende: cidade)

#### Grupo 2: Estrutura Física (3 módulos)
- [ ] `campus` - Campus (depende: endereco)
- [ ] `bloco` - Bloco (depende: campus)
- [ ] `ambiente` - Ambiente (depende: bloco, imagem, arquivo)

#### Grupo 3: Usuários e Perfis (2 módulos)
- [x] `perfil` - Perfil ✅ **JÁ IMPLEMENTADO**
- [ ] `usuario` - Usuário (depende: perfil)

#### Grupo 4: Autenticação/Autorização (2 módulos)
- [ ] `autenticacao` - Autenticação (depende: usuario)
- [ ] `autorizacao` - Autorização (depende: usuario, perfil)

#### Grupo 5: Estrutura Acadêmica (6 módulos)
- [ ] `curso` - Curso (depende: campus, modalidade, nivel-formacao)
- [ ] `disciplina` - Disciplina (depende: curso)
- [ ] `oferta-formacao` - Oferta de Formação (depende: curso)
- [ ] `oferta-formacao-nivel` - Oferta Formação x Nível
- [ ] `etapa` - Etapa (depende: oferta-formacao)
- [ ] `turma` - Turma (depende: curso, etapa)

#### Grupo 6: Calendário e Horários (6 módulos)
- [ ] `calendario-letivo` - Calendário Letivo (depende: campus)
- [ ] `dia-calendario` - Dia Calendário (depende: calendario-letivo)
- [ ] `intervalo-de-tempo` - Intervalo de Tempo (sem dependências)
- [ ] `grade-horario-oferta` - Grade Horário Oferta
- [ ] `grade-horario-intervalo` - Grade Horário x Intervalo
- [ ] `disponibilidade` - Disponibilidade (depende: ambiente, intervalo-de-tempo)

#### Grupo 7: Diários e Aulas (5 módulos)
- [ ] `diario` - Diário (depende: turma, disciplina)
- [ ] `diario-professor` - Diário Professor (depende: diario, usuario)
- [ ] `diario-preferencia` - Diário Preferência Agrupamento
- [ ] `aula` - Aula (depende: diario, intervalo-de-tempo)
- [ ] `professor-indisponibilidade` - Professor Indisponibilidade

#### Grupo 8: Horários Gerados (3 módulos)
- [ ] `horario-gerado` - Horário Gerado (depende: calendario-letivo)
- [ ] `horario-gerado-aula` - Horário Gerado Aula (depende: horario-gerado, aula)
- [ ] `gerar-horario` - Geração de Horários

#### Grupo 9: Recursos e Mídia (4 módulos)
- [ ] `arquivo` - Arquivo (armazenamento)
- [ ] `imagem` - Imagem (depende: arquivo)
- [ ] `imagem-arquivo` - Imagem Arquivo (relação)
- [ ] `reserva` - Reserva (depende: ambiente, usuario)

#### Grupo 10: Utilidades (5 módulos)
- [ ] `turma-disponibilidade` - Turma Disponibilidade
- [ ] `evento` - Evento (depende: calendario-letivo)
- [ ] `common` - Módulos comuns/compartilhados
- [ ] `health` - Health Check (monitoramento)

### 📋 Critérios de Conclusão
- ✅ Interface criada para cada módulo
- ✅ Todos os métodos públicos do service estão na interface
- ✅ Tipagens corretas (sem `any` ou `unknown`)
- ✅ Arquivo `index.ts` exportando os ports

### 📐 Template de Use Case Port

```typescript
// core/{modulo}/application/ports/in/{modulo}.use-case.port.ts
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  {Modulo}CreateInputDto,
  {Modulo}UpdateInputDto,
  {Modulo}FindOneInputDto,
  {Modulo}FindOneOutputDto,
  {Modulo}ListInputDto,
  {Modulo}ListOutputDto,
} from "../../dto";

export interface I{Modulo}UseCasePort {
  {modulo}FindAll(
    accessContext: AccessContext,
    dto: {Modulo}ListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<{Modulo}ListOutputDto>;

  {modulo}FindById(
    accessContext: AccessContext | null,
    dto: {Modulo}FindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<{Modulo}FindOneOutputDto | null>;

  {modulo}FindByIdStrict(
    accessContext: AccessContext | null,
    dto: {Modulo}FindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<{Modulo}FindOneOutputDto>;

  {modulo}Create(
    accessContext: AccessContext,
    dto: {Modulo}CreateInputDto,
  ): Promise<{Modulo}FindOneOutputDto>;

  {modulo}Update(
    accessContext: AccessContext,
    dto: {Modulo}FindOneInputDto & {Modulo}UpdateInputDto,
  ): Promise<{Modulo}FindOneOutputDto>;

  {modulo}Delete(
    accessContext: AccessContext,
    dto: {Modulo}FindOneInputDto,
  ): Promise<boolean>;

  // ... outros métodos específicos do módulo
}
```

---

## FASE 2: Consolidar DTOs e Validações

### 🎯 Objetivo
Mover DTOs para `core/{modulo}/application/dto/` e adicionar validações robustas com `class-validator`.

### 📝 Descrição
- **Mover** DTOs de `adapters/in/http/{modulo}/dto/` para `core/{modulo}/application/dto/`
- **Adicionar** validações com decorators `class-validator`:
  - `@IsString()`, `@IsUUID()`, `@IsOptional()`, etc.
  - `@IsNotEmpty()`, `@MinLength()`, `@MaxLength()`
  - `@Type()` para transformações
- **Manter** compatibilidade com Swagger (`@ApiProperty`)
- **Criar** DTOs específicos quando necessário

### ✅ Checklist de Módulos

#### Grupo 1: Módulos Base (5 módulos)
- [ ] `estado` - DTOs + validações
- [ ] `cidade` - DTOs + validações
- [ ] `modalidade` - DTOs + validações
- [ ] `nivel-formacao` - DTOs + validações
- [ ] `endereco` - DTOs + validações

#### Grupo 2: Estrutura Física (3 módulos)
- [ ] `campus` - DTOs + validações
- [ ] `bloco` - DTOs + validações
- [ ] `ambiente` - DTOs + validações

#### Grupo 3: Usuários e Perfis (2 módulos)
- [ ] `perfil` - DTOs + validações
- [ ] `usuario` - DTOs + validações

#### Grupo 4: Autenticação/Autorização (2 módulos)
- [ ] `autenticacao` - DTOs + validações
- [ ] `autorizacao` - DTOs + validações

#### Grupo 5: Estrutura Acadêmica (6 módulos)
- [ ] `curso` - DTOs + validações
- [ ] `disciplina` - DTOs + validações
- [ ] `oferta-formacao` - DTOs + validações
- [ ] `oferta-formacao-nivel` - DTOs + validações
- [ ] `etapa` - DTOs + validações
- [ ] `turma` - DTOs + validações

#### Grupo 6: Calendário e Horários (6 módulos)
- [ ] `calendario-letivo` - DTOs + validações
- [ ] `dia-calendario` - DTOs + validações
- [ ] `intervalo-de-tempo` - DTOs + validações
- [ ] `grade-horario-oferta` - DTOs + validações
- [ ] `grade-horario-intervalo` - DTOs + validações
- [ ] `disponibilidade` - DTOs + validações

#### Grupo 7: Diários e Aulas (5 módulos)
- [ ] `diario` - DTOs + validações
- [ ] `diario-professor` - DTOs + validações
- [ ] `diario-preferencia` - DTOs + validações
- [ ] `aula` - DTOs + validações
- [ ] `professor-indisponibilidade` - DTOs + validações

#### Grupo 8: Horários Gerados (3 módulos)
- [ ] `horario-gerado` - DTOs + validações
- [ ] `horario-gerado-aula` - DTOs + validações
- [ ] `gerar-horario` - DTOs + validações

#### Grupo 9: Recursos e Mídia (4 módulos)
- [ ] `arquivo` - DTOs + validações
- [ ] `imagem` - DTOs + validações
- [ ] `imagem-arquivo` - DTOs + validações
- [ ] `reserva` - DTOs + validações

#### Grupo 10: Utilidades (5 módulos)
- [ ] `turma-disponibilidade` - DTOs + validações
- [ ] `evento` - DTOs + validações
- [ ] `common` - DTOs + validações (se aplicável)
- [ ] `health` - DTOs + validações

### 📋 Critérios de Conclusão
- ✅ DTOs movidos para `core/{modulo}/application/dto/`
- ✅ Validações `class-validator` adicionadas
- ✅ Imports atualizados em controllers e services
- ✅ Testes passando (se existentes)

### 📐 Template de DTO com Validações

```typescript
// core/{modulo}/application/dto/{modulo}-create.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class {Modulo}CreateInputDto {
  @ApiProperty({ description: "Nome do {modulo}" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nome!: string;

  @ApiProperty({ description: "Descrição do {modulo}", required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  descricao?: string;

  @ApiProperty({ description: "ID da relação", type: "string", format: "uuid" })
  @IsUUID()
  @IsNotEmpty()
  relacaoId!: string;
}
```

---

## FASE 3: Refatorar Services para Use Cases

### 🎯 Objetivo
Fazer services implementarem os Use Case Ports e remover dependências diretas de infraestrutura.

### 📝 Descrição
- **Adicionar** `implements I{Modulo}UseCasePort` nos services
- **Remover** acesso direto a `DatabaseContextService` (quando possível)
- **Delegar** operações de dados para repository ports
- **Manter** apenas lógica de negócio nos services
- **Validar** regras de domínio antes de chamar repositórios

### ✅ Checklist de Módulos

#### Grupo 1: Módulos Base (5 módulos)
- [ ] `estado` - Service implementa use case port
- [ ] `cidade` - Service implementa use case port
- [ ] `modalidade` - Service implementa use case port
- [ ] `nivel-formacao` - Service implementa use case port
- [ ] `endereco` - Service implementa use case port

#### Grupo 2: Estrutura Física (3 módulos)
- [ ] `campus` - Service implementa use case port
- [ ] `bloco` - Service implementa use case port
- [ ] `ambiente` - Service implementa use case port

#### Grupo 3: Usuários e Perfis (2 módulos)
- [x] `perfil` - Service implementa use case port ✅ **JÁ IMPLEMENTADO**
- [ ] `usuario` - Service implementa use case port

#### Grupo 4: Autenticação/Autorização (2 módulos)
- [ ] `autenticacao` - Service implementa use case port
- [ ] `autorizacao` - Service implementa use case port

#### Grupo 5: Estrutura Acadêmica (6 módulos)
- [ ] `curso` - Service implementa use case port
- [ ] `disciplina` - Service implementa use case port
- [ ] `oferta-formacao` - Service implementa use case port
- [ ] `oferta-formacao-nivel` - Service implementa use case port
- [ ] `etapa` - Service implementa use case port
- [ ] `turma` - Service implementa use case port

#### Grupo 6: Calendário e Horários (6 módulos)
- [ ] `calendario-letivo` - Service implementa use case port
- [ ] `dia-calendario` - Service implementa use case port
- [ ] `intervalo-de-tempo` - Service implementa use case port
- [ ] `grade-horario-oferta` - Service implementa use case port
- [ ] `grade-horario-intervalo` - Service implementa use case port
- [ ] `disponibilidade` - Service implementa use case port

#### Grupo 7: Diários e Aulas (5 módulos)
- [ ] `diario` - Service implementa use case port
- [ ] `diario-professor` - Service implementa use case port
- [ ] `diario-preferencia` - Service implementa use case port
- [ ] `aula` - Service implementa use case port
- [ ] `professor-indisponibilidade` - Service implementa use case port

#### Grupo 8: Horários Gerados (3 módulos)
- [ ] `horario-gerado` - Service implementa use case port
- [ ] `horario-gerado-aula` - Service implementa use case port
- [ ] `gerar-horario` - Service implementa use case port

#### Grupo 9: Recursos e Mídia (4 módulos)
- [ ] `arquivo` - Service implementa use case port
- [ ] `imagem` - Service implementa use case port
- [ ] `imagem-arquivo` - Service implementa use case port
- [ ] `reserva` - Service implementa use case port

#### Grupo 10: Utilidades (5 módulos)
- [ ] `turma-disponibilidade` - Service implementa use case port
- [ ] `evento` - Service implementa use case port
- [ ] `common` - Service implementa use case port (se aplicável)
- [ ] `health` - Service implementa use case port

### 📋 Critérios de Conclusão
- ✅ Service implementa `I{Modulo}UseCasePort`
- ✅ Service usa apenas repository port para dados
- ✅ Lógica de negócio isolada
- ✅ Sem dependências diretas de TypeORM no service

### 📐 Template de Service Refatorado

> **Nota**: A pasta `use-cases/` é criada, mas **por enquanto** toda a lógica fica centralizada
> em `{modulo}.service.ts`. Futuramente, pode ser desmembrado em use cases individuais
> (ex: `create-{modulo}.use-case.ts`, `update-{modulo}.use-case.ts`).

```typescript
// core/{modulo}/application/use-cases/{modulo}.service.ts
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { AccessContext } from "@/infrastructure/access-context";
import type { I{Modulo}UseCasePort } from "../ports/in/{modulo}.use-case.port";
import type { I{Modulo}RepositoryPort } from "../ports/out/{modulo}.repository.port";
import type {
  {Modulo}CreateInputDto,
  {Modulo}FindOneInputDto,
  {Modulo}FindOneOutputDto,
  {Modulo}ListInputDto,
  {Modulo}ListOutputDto,
  {Modulo}UpdateInputDto,
} from "../dto";

/**
 * Service centralizado para o módulo {Modulo}.
 * Implementa todos os use cases definidos em I{Modulo}UseCasePort.
 *
 * Por enquanto, toda a lógica fica aqui. Futuramente, pode ser
 * desmembrado em use cases individuais se necessário.
 */
@Injectable()
export class {Modulo}Service implements I{Modulo}UseCasePort {
  constructor(
    @Inject("I{Modulo}RepositoryPort")
    private readonly {modulo}Repository: I{Modulo}RepositoryPort,
    // Injetar outros services necessários
  ) {}

  async {modulo}FindAll(
    accessContext: AccessContext,
    dto: {Modulo}ListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<{Modulo}ListOutputDto> {
    return this.{modulo}Repository.findAll(accessContext, dto, selection);
  }

  async {modulo}FindByIdStrict(
    accessContext: AccessContext | null,
    dto: {Modulo}FindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<{Modulo}FindOneOutputDto> {
    const entity = await this.{modulo}Repository.findById(accessContext, dto, selection);

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async {modulo}Create(
    accessContext: AccessContext,
    dto: {Modulo}CreateInputDto,
  ): Promise<{Modulo}FindOneOutputDto> {
    await accessContext.ensurePermission("{modulo}:create", { dto });

    // Validações de negócio aqui
    // ...

    // Criar entidade via repository
    const created = await this.{modulo}Repository.create(dto);

    return this.{modulo}FindByIdStrict(accessContext, { id: created.id });
  }

  // ... outros métodos (update, delete, etc.)
}
```

---

## FASE 4: Melhorar Repository Adapters

### 🎯 Objetivo
Padronizar e enriquecer os 27 repository adapters existentes, removendo acessos diretos ao `DatabaseContext` dos services.

### 📝 Descrição
- **Padronizar** métodos dos repository adapters
- **Adicionar** métodos faltantes para operações CRUD completas
- **Melhorar** tratamento de erros e retornos
- **Remover** acesso direto a `databaseContext.{modulo}Repository` dos services
- **Garantir** que toda operação de dados passe pelo repository port

### ✅ Checklist de Módulos (27 com Repository Ports)

#### Grupo 1: Módulos Base (5 módulos)
- [ ] `estado` - Melhorar adapter
- [ ] `cidade` - Melhorar adapter
- [ ] `modalidade` - Melhorar adapter
- [ ] `nivel-formacao` - Melhorar adapter
- [ ] `endereco` - Melhorar adapter

#### Grupo 2: Estrutura Física (3 módulos)
- [ ] `campus` - Melhorar adapter
- [ ] `bloco` - Melhorar adapter
- [ ] `ambiente` - Melhorar adapter

#### Grupo 3: Usuários e Perfis (2 módulos)
- [x] `perfil` - Adapter padronizado ✅ **JÁ IMPLEMENTADO**
- [ ] `usuario` - Melhorar adapter

#### Grupo 5: Estrutura Acadêmica (5 módulos)
- [ ] `curso` - Melhorar adapter
- [ ] `disciplina` - Melhorar adapter
- [ ] `oferta-formacao` - Melhorar adapter
- [ ] `etapa` - Melhorar adapter
- [ ] `turma` - Melhorar adapter

#### Grupo 6: Calendário e Horários (4 módulos)
- [ ] `calendario-letivo` - Melhorar adapter
- [ ] `dia-calendario` - Melhorar adapter
- [ ] `intervalo-de-tempo` - Melhorar adapter
- [ ] `disponibilidade` - Melhorar adapter

#### Grupo 7: Diários e Aulas (3 módulos)
- [ ] `diario` - Melhorar adapter
- [ ] `diario-professor` - Melhorar adapter
- [ ] `aula` - Melhorar adapter

#### Grupo 8: Horários Gerados (2 módulos)
- [ ] `horario-gerado` - Melhorar adapter
- [ ] `horario-gerado-aula` - Melhorar adapter

#### Grupo 9: Recursos e Mídia (3 módulos)
- [ ] `arquivo` - Melhorar adapter
- [ ] `imagem` - Melhorar adapter
- [ ] `reserva` - Melhorar adapter

### 📋 Critérios de Conclusão
- ✅ Repository adapter com métodos CRUD completos
- ✅ Sem acesso direto a `databaseContext` nos services
- ✅ Paginação usando `NestJsPaginateAdapter`
- ✅ Tratamento adequado de erros

### 📐 Métodos Padrão do Repository Adapter

```typescript
// Métodos essenciais que todo repository adapter deve ter:

interface I{Modulo}RepositoryPort {
  // Busca
  findAll(accessContext, dto, selection?): Promise<ListOutputDto>;
  findById(accessContext, dto, selection?): Promise<OutputDto | null>;
  findPaginated(accessContext, criteria, config, selection?): Promise<IPaginationResult>;

  // Criação
  create(dto?: Partial<Entity>): Entity;

  // Persistência
  save(entity: Entity | Entity[]): Promise<Entity | Entity[]>;
  merge(target: Entity, source: DeepPartial<Entity>): Entity;

  // Atualização
  update(id: string, dto: UpdateDto): Promise<void>;

  // Remoção
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;

  // Métodos específicos do módulo
  // ...
}
```

---

## FASE 5: Refatorar Controllers e Criar Módulos NestJS

### 🎯 Objetivo
Organizar controllers em `adapters/in/http/` e criar módulos NestJS em `server/modules/` para configuração de DI.

### 📝 Descrição
- **Manter** controllers em `adapters/in/http/{modulo}/{modulo}.controller.ts`
- **Criar** módulo NestJS em `server/modules/{modulo}.module.ts` (injeção de dependência)
- **Manter** decorators `@ApiOperation`, `@ApiOkResponse`, etc.
- **Simplificar** controllers (apenas delegar para services)
- **Garantir** compatibilidade 100% com rotas atuais
- O módulo NestJS é responsável por fazer o "wiring" entre ports e adapters

### ✅ Checklist de Módulos

#### Grupo 1: Módulos Base (5 módulos)
- [ ] `estado` - Controller + Módulo NestJS
- [ ] `cidade` - Controller + Módulo NestJS
- [ ] `modalidade` - Controller + Módulo NestJS
- [ ] `nivel-formacao` - Controller + Módulo NestJS
- [ ] `endereco` - Controller + Módulo NestJS

#### Grupo 2: Estrutura Física (3 módulos)
- [ ] `campus` - Controller + Módulo NestJS
- [ ] `bloco` - Controller + Módulo NestJS
- [ ] `ambiente` - Controller + Módulo NestJS

#### Grupo 3: Usuários e Perfis (2 módulos)
- [ ] `perfil` - Controller + Módulo NestJS
- [ ] `usuario` - Controller + Módulo NestJS

#### Grupo 4: Autenticação/Autorização (2 módulos)
- [ ] `autenticacao` - Controller + Módulo NestJS
- [ ] `autorizacao` - Controller + Módulo NestJS

#### Grupo 5: Estrutura Acadêmica (6 módulos)
- [ ] `curso` - Controller + Módulo NestJS
- [ ] `disciplina` - Controller + Módulo NestJS
- [ ] `oferta-formacao` - Controller + Módulo NestJS
- [ ] `oferta-formacao-nivel` - Controller + Módulo NestJS
- [ ] `etapa` - Controller + Módulo NestJS
- [ ] `turma` - Controller + Módulo NestJS

#### Grupo 6: Calendário e Horários (6 módulos)
- [ ] `calendario-letivo` - Controller + Módulo NestJS
- [ ] `dia-calendario` - Controller + Módulo NestJS
- [ ] `intervalo-de-tempo` - Controller + Módulo NestJS
- [ ] `grade-horario-oferta` - Controller + Módulo NestJS
- [ ] `grade-horario-intervalo` - Controller + Módulo NestJS
- [ ] `disponibilidade` - Controller + Módulo NestJS

#### Grupo 7: Diários e Aulas (5 módulos)
- [ ] `diario` - Controller + Módulo NestJS
- [ ] `diario-professor` - Controller + Módulo NestJS
- [ ] `diario-preferencia` - Controller + Módulo NestJS
- [ ] `aula` - Controller + Módulo NestJS
- [ ] `professor-indisponibilidade` - Controller + Módulo NestJS

#### Grupo 8: Horários Gerados (3 módulos)
- [ ] `horario-gerado` - Controller + Módulo NestJS
- [ ] `horario-gerado-aula` - Controller + Módulo NestJS
- [ ] `gerar-horario` - Controller + Módulo NestJS

#### Grupo 9: Recursos e Mídia (4 módulos)
- [ ] `arquivo` - Controller + Módulo NestJS
- [ ] `imagem` - Controller + Módulo NestJS
- [ ] `imagem-arquivo` - Controller + Módulo NestJS
- [ ] `reserva` - Controller + Módulo NestJS

#### Grupo 10: Utilidades (5 módulos)
- [ ] `turma-disponibilidade` - Controller + Módulo NestJS
- [ ] `evento` - Controller + Módulo NestJS
- [ ] `common` - Controller + Módulo NestJS (se existir)
- [ ] `health` - Controller + Módulo NestJS

### 📋 Critérios de Conclusão
- ✅ Controller em `adapters/in/http/{modulo}/{modulo}.controller.ts`
- ✅ Módulo NestJS criado em `server/modules/{modulo}.module.ts`
- ✅ Bindings de ports para adapters configurados no módulo
- ✅ Imports atualizados corretamente
- ✅ Rotas REST funcionando identicamente

### 📐 Template de Controller

```typescript
// adapters/in/http/{modulo}/{modulo}.controller.ts
import { Body, Controller, Get, Param, Post, Put, Delete, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { {Modulo}Service } from "@/v2/core/{modulo}/application/use-cases/{modulo}.service";
import {
  {Modulo}CreateInputDto,
  {Modulo}FindOneInputDto,
  {Modulo}FindOneOutputDto,
  {Modulo}ListInputDto,
  {Modulo}ListOutputDto,
  {Modulo}UpdateInputDto,
} from "@/v2/core/{modulo}/application/dto";

@ApiTags("{modulos}")
@Controller("/{modulos}")
export class {Modulo}Controller {
  constructor(private readonly {modulo}Service: {Modulo}Service) {}

  @Get("/")
  @ApiOperation({ summary: "Lista {modulos}" })
  @ApiOkResponse({ type: {Modulo}ListOutputDto })
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: {Modulo}ListInputDto,
  ): Promise<{Modulo}ListOutputDto> {
    return this.{modulo}Service.{modulo}FindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca {modulo} por ID" })
  @ApiOkResponse({ type: {Modulo}FindOneOutputDto })
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: {Modulo}FindOneInputDto,
  ): Promise<{Modulo}FindOneOutputDto> {
    return this.{modulo}Service.{modulo}FindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria {modulo}" })
  @ApiCreatedResponse({ type: {Modulo}FindOneOutputDto })
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: {Modulo}CreateInputDto,
  ): Promise<{Modulo}FindOneOutputDto> {
    return this.{modulo}Service.{modulo}Create(accessContext, dto);
  }

  // ... outros endpoints
}
```

### 📐 Template de Módulo NestJS

```typescript
// server/modules/{modulo}.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller (Adapter In)
import { {Modulo}Controller } from "@/v2/adapters/in/http/{modulo}/{modulo}.controller";

// Service (Use Case)
import { {Modulo}Service } from "@/v2/core/{modulo}/application/use-cases/{modulo}.service";

// Repository Adapter (Adapter Out)
import { {Modulo}TypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters/{modulo}-typeorm.repository.adapter";

// Entity TypeORM
import { {Modulo}Entity } from "@/v2/adapters/out/persistence/typeorm/entities/{modulo}.entity";

/**
 * Módulo NestJS para {Modulo}
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([{Modulo}Entity]),
  ],
  controllers: [{Modulo}Controller],
  providers: [
    // Service (implementa Use Case Port)
    {Modulo}Service,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: "I{Modulo}RepositoryPort",
      useClass: {Modulo}TypeOrmRepositoryAdapter,
    },
  ],
  exports: [{Modulo}Service],
})
export class {Modulo}Module {}
```

---

## FASE 6: Criar/Enriquecer Domain Models

### 🎯 Objetivo
Criar tipagens e classes de domínio com validações e lógica de negócio.

### 📝 Descrição
- **Criar** tipagem (interface/type) em `core/{modulo}/domain/{modulo}.types.ts`
- **Criar** classe que implementa a tipagem em `core/{modulo}/domain/{modulo}.domain.ts`
- **Adicionar** validações de domínio (regras de negócio) na classe
- **Implementar** value objects quando necessário (Email, CPF, etc.)
- **Adicionar** métodos de domínio (cálculos, validações, transformações)
- **Documentar** regras de negócio

### ✅ Checklist de Módulos

#### Grupo 1: Módulos Base (5 módulos)
- [ ] `estado` - Criar/melhorar domain model
- [ ] `cidade` - Criar/melhorar domain model
- [ ] `modalidade` - Criar/melhorar domain model
- [ ] `nivel-formacao` - Criar/melhorar domain model
- [ ] `endereco` - Criar/melhorar domain model

#### Grupo 2: Estrutura Física (3 módulos)
- [ ] `campus` - Criar/melhorar domain model
- [ ] `bloco` - Criar/melhorar domain model
- [ ] `ambiente` - Criar/melhorar domain model

#### Grupo 3: Usuários e Perfis (2 módulos)
- [x] `perfil` - Domain model criado ✅ **JÁ IMPLEMENTADO**
- [ ] `usuario` - Criar/melhorar domain model

#### Grupo 4: Autenticação/Autorização (2 módulos)
- [ ] `autenticacao` - Criar/melhorar domain model
- [ ] `autorizacao` - Criar/melhorar domain model

#### Grupo 5: Estrutura Acadêmica (6 módulos)
- [ ] `curso` - Criar/melhorar domain model
- [ ] `disciplina` - Criar/melhorar domain model
- [ ] `oferta-formacao` - Criar/melhorar domain model
- [ ] `oferta-formacao-nivel` - Criar/melhorar domain model
- [ ] `etapa` - Criar/melhorar domain model
- [ ] `turma` - Criar/melhorar domain model

#### Grupo 6: Calendário e Horários (6 módulos)
- [ ] `calendario-letivo` - Criar/melhorar domain model
- [ ] `dia-calendario` - Criar/melhorar domain model
- [ ] `intervalo-de-tempo` - Criar/melhorar domain model
- [ ] `grade-horario-oferta` - Criar/melhorar domain model
- [ ] `grade-horario-intervalo` - Criar/melhorar domain model
- [ ] `disponibilidade` - Criar/melhorar domain model

#### Grupo 7: Diários e Aulas (5 módulos)
- [ ] `diario` - Criar/melhorar domain model
- [ ] `diario-professor` - Criar/melhorar domain model
- [ ] `diario-preferencia` - Criar/melhorar domain model
- [ ] `aula` - Criar/melhorar domain model
- [ ] `professor-indisponibilidade` - Criar/melhorar domain model

#### Grupo 8: Horários Gerados (3 módulos)
- [ ] `horario-gerado` - Criar/melhorar domain model
- [ ] `horario-gerado-aula` - Criar/melhorar domain model
- [ ] `gerar-horario` - Criar/melhorar domain model

#### Grupo 9: Recursos e Mídia (4 módulos)
- [ ] `arquivo` - Criar/melhorar domain model
- [ ] `imagem` - Criar/melhorar domain model
- [ ] `imagem-arquivo` - Criar/melhorar domain model
- [ ] `reserva` - Criar/melhorar domain model

#### Grupo 10: Utilidades (5 módulos)
- [ ] `turma-disponibilidade` - Criar/melhorar domain model
- [ ] `evento` - Criar/melhorar domain model
- [ ] `common` - Criar/melhorar domain model (se aplicável)
- [ ] `health` - Criar/melhorar domain model (se aplicável)

### 📋 Critérios de Conclusão
- ✅ Tipagem criada em `core/{modulo}/domain/{modulo}.types.ts`
- ✅ Classe de domínio criada em `core/{modulo}/domain/{modulo}.domain.ts`
- ✅ Classe implementa a tipagem definida
- ✅ Validações de domínio implementadas na classe
- ✅ Value objects criados (quando necessário)
- ✅ Métodos de domínio documentados

### 📐 Template de Tipagem (Types)

```typescript
// core/{modulo}/domain/{modulo}.types.ts

import type { IRelacao } from "@/v2/core/relacao/domain/relacao.types";

/**
 * Tipagem da entidade {Modulo}
 * Define a estrutura de dados sem comportamento
 */
export interface I{Modulo} {
  // Propriedades essenciais
  id: string;
  nome: string;
  descricao?: string | null;

  // Relações (referência a outras tipagens)
  relacao?: IRelacao | null;
  relacaoId?: string | null;

  // Timestamps
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted?: Date | null;
}

/**
 * Tipagem para criação de {Modulo}
 */
export interface I{Modulo}Create {
  nome: string;
  descricao?: string | null;
  relacaoId?: string | null;
}

/**
 * Tipagem para atualização de {Modulo}
 */
export interface I{Modulo}Update {
  nome?: string;
  descricao?: string | null;
  relacaoId?: string | null;
}
```

### 📐 Template de Classe de Domínio

```typescript
// core/{modulo}/domain/{modulo}.domain.ts

import type { I{Modulo}, I{Modulo}Create } from "./{modulo}.types";

/**
 * Entidade de Domínio: {Modulo}
 * Implementa a tipagem I{Modulo} e adiciona regras de negócio
 */
export class {Modulo} implements I{Modulo} {
  // Propriedades da tipagem
  id!: string;
  nome!: string;
  descricao?: string | null;

  // Relações
  relacao?: IRelacao | null;
  relacaoId?: string | null;

  // Timestamps
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted?: Date | null;

  // ========================================
  // Métodos de Domínio (Regras de Negócio)
  // ========================================

  /**
   * Valida se o {modulo} está ativo (não deletado)
   */
  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Valida se pode ser editado
   */
  podeSerEditado(): boolean {
    return this.isAtivo();
  }

  /**
   * Valida se pode ser deletado
   */
  podeSerDeletado(): boolean {
    return this.isAtivo();
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de {Modulo}
   * @throws Error se os dados forem inválidos
   */
  static criar(dados: I{Modulo}Create): {Modulo} {
    const instance = new {Modulo}();

    // Validações de criação
    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new Error("Nome é obrigatório");
    }

    if (dados.nome.length > 255) {
      throw new Error("Nome deve ter no máximo 255 caracteres");
    }

    // Atribuir propriedades
    instance.nome = dados.nome.trim();
    instance.descricao = dados.descricao ?? null;
    instance.relacaoId = dados.relacaoId ?? null;
    instance.dateCreated = new Date();
    instance.dateUpdated = new Date();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: I{Modulo}): {Modulo} {
    const instance = new {Modulo}();
    Object.assign(instance, dados);
    return instance;
  }
}
```

---

## 📊 Resumo de Progresso

### Módulos por Status

| Status | Quantidade | Módulos |
|--------|------------|---------|
| ✅ **Completamente Refatorado** | 1 | perfil |
| 🔶 **Parcialmente Refatorado** | 26 | Com repository ports, sem use case ports |
| ⚪ **Não Iniciado** | 14 | Sem ports criados |

### Progresso por Fase

| Fase | Progresso | Status |
|------|-----------|--------|
| **FASE 1** - Use Case Ports | 1/41 (2.4%) | 🚧 Em Andamento |
| **FASE 2** - DTOs e Validações | 0/41 (0%) | ⚪ Não Iniciado |
| **FASE 3** - Services Refatorados | 1/41 (2.4%) | 🚧 Em Andamento |
| **FASE 4** - Repository Adapters | 1/27 (3.7%) | 🚧 Em Andamento |
| **FASE 5** - Controllers | 0/41 (0%) | ⚪ Não Iniciado |
| **FASE 6** - Domain Models | 10/41 (24.4%) | 🔶 Parcial |

---

## 🎯 Estratégia de Execução

### Ordem Recomendada de Refatoração

#### 1. **Prioridade Alta** (Módulos Fundamentais)
```
1. estado, cidade, endereco
2. modalidade, nivel-formacao
3. campus, bloco, ambiente
4. usuario, perfil ✅
5. autenticacao, autorizacao
```

#### 2. **Prioridade Média** (Estrutura Acadêmica)
```
6. curso, disciplina
7. oferta-formacao, etapa
8. turma
9. calendario-letivo, dia-calendario
10. intervalo-de-tempo, disponibilidade
```

#### 3. **Prioridade Baixa** (Recursos Específicos)
```
11. diario, diario-professor, aula
12. horario-gerado, horario-gerado-aula
13. arquivo, imagem, reserva
14. Demais módulos utilitários
```

### Abordagem de Trabalho

1. **Trabalhar módulo por módulo** através de todas as 6 fases
2. **OU** trabalhar fase por fase para todos os módulos

**Recomendação**: Trabalhar **módulo por módulo** permite validação completa de cada módulo antes de prosseguir.

---

## ✅ Critérios de Qualidade Global

### Para Cada Módulo Refatorado

- [ ] ✅ Use Case Port criado e implementado
- [ ] ✅ Repository Port padronizado
- [ ] ✅ DTOs com validações robustas
- [ ] ✅ Service sem dependências de infraestrutura
- [ ] ✅ Domain model com regras de negócio
- [ ] ✅ Controller simplificado
- [ ] ✅ Testes passando (se existentes)
- [ ] ✅ APIs REST inalteradas (compatibilidade)
- [ ] ✅ Código compilando sem erros TypeScript
- [ ] ✅ Zero uso de `any` ou `unknown` injustificado

### Métricas de Sucesso

- **Desacoplamento**: Core independente de frameworks
- **Testabilidade**: 80%+ de cobertura de testes (futuro)
- **Manutenibilidade**: Código limpo e organizado
- **Performance**: Sem degradação de performance
- **DX**: Developer Experience melhorado

---

## 🔧 Ferramentas e Automação

### Scripts Recomendados

```bash
# Validar estrutura de um módulo
npm run validate:module -- perfil

# Gerar template de use case port
npm run generate:use-case-port -- ambiente

# Gerar template de repository port
npm run generate:repository-port -- ambiente

# Gerar template completo de módulo
npm run generate:module -- novo-modulo

# Validar todos os ports criados
npm run validate:ports
```

### Linters e Formatters

- **Biome**: Linting e formatação (já configurado)
- **TypeScript**: Validação de tipos estrita
- **ESLint**: Regras adicionais de código

---

## 📚 Referências

- [Arquitetura Hexagonal - Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [nestjs-paginate](https://www.npmjs.com/package/nestjs-paginate)

---

## 📝 Notas Finais

### Observações Importantes

1. **Não remover** código legado até ter certeza que não é usado
2. **Não quebrar** APIs existentes em nenhuma fase
3. **Documentar** decisões arquiteturais importantes
4. **Testar** cada módulo após refatoração
5. **Commitar** após cada fase completada por módulo

### Pontos de Atenção

- **DatabaseContextService**: Remover acesso direto apenas quando repository port estiver completo
- **SearchService**: Pode ser mantido para compatibilidade em módulos legados
- **AccessContext**: Deve ser mantido em todos os métodos
- **Paginação**: Sempre usar `NestJsPaginateAdapter` via repository
- **Módulos NestJS**: Ficam em `server/modules/`, são responsáveis pelo binding ports↔adapters
- **Domain Types vs Class**: Sempre criar primeiro a tipagem, depois a classe que implementa
- **Use Cases**: Por enquanto centralizados em `{modulo}.service.ts`, pasta já preparada para expansão

---

**Documento elaborado em**: 2026-01-25
**Versão**: 1.1
**Autor**: Equipe de Desenvolvimento
**Status**: 🚧 Em Execução

### Changelog
- **v1.1**: Ajustada estrutura - módulos NestJS em `server/modules/`, domain com types + class, use-cases centralizados

---
