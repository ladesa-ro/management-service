# Arquitetura Hexagonal - Guia de Implementação

## Visão Geral

Este projeto está sendo migrado para **Arquitetura Hexagonal (Ports & Adapters)** mantendo o uso do **nestjs-paginate** para paginação.

✅ **Type-Safe**: Todas as tipagens são específicas e bem definidas, sem uso de `any` ou `unknown` não justificado

## Estrutura

### Ports Genéricos (Compartilhados)

Localizados em `app/lib/v2/application/ports/pagination/`:

- **IPaginationCriteria**: Critérios de busca genéricos (page, limit, search, sortBy, filters)
- **IPaginationResult<T>**: Resultado paginado genérico tipado
- **IPaginationConfig<T>**: Configuração de paginação com `FindOptionsRelations<T>` do TypeORM
- **IPaginationPort**: Interface do port de paginação com `SelectQueryBuilder<T>`

### Tipagem Forte

Todos os ports e adapters foram implementados com **tipagem forte**:
- Uso de genéricos `<T>` para type safety
- `DeepPartial<Entity>` do TypeORM para operações parciais
- `FindOptionsRelations<T>` para relações tipadas
- `SelectQueryBuilder<T>` para queries tipadas
- Zero uso de `any` ou `unknown` não justificado

### Adapters Genéricos

#### NestJsPaginateAdapter
Localizado em `app/lib/v2/adapters/out/persistence/pagination/nestjs-paginate.adapter.ts`

Implementa `IPaginationPort` usando **nestjs-paginate**. Encapsula toda a lógica do nestjs-paginate, mantendo o domínio limpo.

## Módulo Perfil - Exemplo de Implementação

O módulo **Perfil** foi refatorado como exemplo/template para os demais módulos.

### 1. Ports do Módulo

**Porta de Entrada** (`app/lib/v2/core/perfil/application/ports/in/perfil.use-case.port.ts`):
```typescript
export interface IPerfilUseCasePort {
  perfilGetAllActive(accessContext, usuarioId): Promise<PerfilFindOneOutputDto[]>;
  perfilFindAll(accessContext, dto, selection?): Promise<PerfilListOutputDto>;
  perfilFindById(accessContext, dto, selection?): Promise<PerfilFindOneOutputDto | null>;
  perfilFindByIdStrict(accessContext, dto, selection?): Promise<PerfilFindOneOutputDto>;
  perfilSetVinculos(accessContext, dto): Promise<PerfilListOutputDto>;
}
```

**Porta de Saída** (`app/lib/v2/core/perfil/application/ports/out/perfil.repository.port.ts`):
```typescript
export interface IPerfilRepositoryPort {
  findAll(accessContext, dto, selection?): Promise<PerfilListOutputDto>;
  findById(accessContext, dto, selection?): Promise<PerfilFindOneOutputDto | null>;
  findAllActiveByUsuarioId(accessContext, usuarioId): Promise<PerfilFindOneOutputDto[]>;
  findPaginated(accessContext, criteria, config, selection?): Promise<IPaginationResult>;
  saveMany(perfis): Promise<void>;
  findByUsuarioAndCampus(usuarioId, campusId): Promise<PerfilFindOneOutputDto[]>;
  deactivateByIds(ids): Promise<void>;
}
```

### 2. Adapter de Persistência

**PerfilTypeOrmRepositoryAdapter** (`app/lib/v2/adapters/out/persistence/typeorm/adapters/perfil-typeorm.repository.adapter.ts`):

Implementa `IPerfilRepositoryPort` usando:
- TypeORM para queries
- `NestJsPaginateAdapter` para paginação
- Converte DTOs em `IPaginationCriteria`

### 3. Use Case Service

**PerfilService** (`app/lib/v2/core/perfil/application/use-cases/perfil.service.ts`):

- Implementa `IPerfilUseCasePort`
- Injeta `IPerfilRepositoryPort` via DI
- Contém apenas lógica de negócio (validações, orquestração)
- **Não tem conhecimento** de TypeORM ou nestjs-paginate

### 4. Configuração do Módulo

**PerfilModule** (`app/lib/v2/core/perfil/perfil.module.ts`):

```typescript
@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [PerfilController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Adapter de repositório (implementação da porta de saída)
    {
      provide: "IPerfilRepositoryPort",
      useClass: PerfilTypeOrmRepositoryAdapter,
    },

    // Use case service (implementação da porta de entrada)
    PerfilService,
  ],
  exports: [PerfilService],
})
export class PerfilModule {}
```

## Como Migrar Outros Módulos

### Passo 1: Criar Ports

1. Criar `app/lib/v2/core/{modulo}/application/ports/in/{modulo}.use-case.port.ts`
2. Criar `app/lib/v2/core/{modulo}/application/ports/out/{modulo}.repository.port.ts`
3. Criar `app/lib/v2/core/{modulo}/application/ports/index.ts`

### Passo 2: Criar Adapter de Repositório

1. Criar `app/lib/v2/adapters/out/persistence/typeorm/adapters/{modulo}-typeorm.repository.adapter.ts`
2. Implementar `I{Modulo}RepositoryPort`
3. Injetar `NestJsPaginateAdapter` no construtor
4. Mover toda lógica de acesso a dados do service para o adapter

### Passo 3: Refatorar Service

1. Adicionar `implements I{Modulo}UseCasePort`
2. Injetar `I{Modulo}RepositoryPort` via `@Inject("{token}")`
3. Remover importações de `SearchService`, `FilterOperator`, `paginateConfig`
4. Delegar operações de dados para o repositório
5. Manter apenas lógica de negócio

### Passo 4: Configurar Module

1. Registrar `NestJsPaginateAdapter` em providers
2. Registrar adapter do repositório com token `"I{Modulo}RepositoryPort"`
3. Manter service como provider

## Benefícios

✅ **Desacoplamento**: Lógica de negócio independente de framework/biblioteca
✅ **Testabilidade**: Fácil criar mocks dos ports
✅ **Manutenibilidade**: Mudanças isoladas em camadas específicas
✅ **Migração Gradual**: Pode ser feito módulo por módulo
✅ **Compatibilidade**: Mantém nestjs-paginate funcionando normalmente
✅ **API Estável**: Zero breaking changes na API REST/GraphQL

## Próximos Módulos Sugeridos

1. **Campus** - Segundo mais complexo
2. **Usuario** - Essencial
3. **Demais módulos** - Seguir o mesmo padrão

## Observações Importantes

- **Não remover** `SearchService` ainda (outros módulos ainda usam)
- **Controllers** não precisam mudar (usam o service normalmente)
- **DTOs** permanecem inalterados
- **Entidades TypeORM** não mudam
- O `DatabaseContextService` ainda pode ser usado para operações diretas quando necessário
