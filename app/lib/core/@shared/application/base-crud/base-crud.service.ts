import { NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

/**
 * Interface base para ports de repositório com operações CRUD
 */
export interface IBaseCrudRepositoryPort<Entity, ListOutputDto, FindOneOutputDto> {
  findAll(
    accessContext: AccessContext,
    dto: unknown,
    selection?: string[] | boolean,
  ): Promise<ListOutputDto>;

  findById(
    accessContext: AccessContext | null,
    dto: { id: string | number },
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto | null>;

  findByIdSimple?(
    accessContext: AccessContext,
    id: string | number,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto | null>;

  save(entity: DeepPartial<Entity>): Promise<Entity>;

  create(): Entity;

  merge(entity: Entity, data: DeepPartial<Entity>): void;

  softDeleteById(id: string | number): Promise<void>;
}

/**
 * Classe base abstrata para services CRUD.
 *
 * Fornece implementações padrão para operações CRUD comuns:
 * - findAll: listagem com paginação
 * - findById: busca por ID
 * - findByIdStrict: busca por ID com exceção se não encontrado
 * - findByIdSimple: busca simplificada por ID
 * - findByIdSimpleStrict: busca simplificada com exceção se não encontrado
 * - create: criação de novo registro
 * - update: atualização de registro existente
 * - deleteOneById: exclusão lógica
 *
 * @template Entity - Tipo da entidade
 * @template ListInputDto - Tipo do DTO de entrada para listagem
 * @template ListOutputDto - Tipo do DTO de saída para listagem
 * @template FindOneInputDto - Tipo do DTO de entrada para busca única
 * @template FindOneOutputDto - Tipo do DTO de saída para busca única
 * @template CreateInputDto - Tipo do DTO de entrada para criação
 * @template UpdateInputDto - Tipo do DTO de entrada para atualização
 */
export abstract class BaseCrudService<
  Entity extends { id: string | number },
  ListInputDto,
  ListOutputDto,
  FindOneInputDto extends { id: string | number },
  FindOneOutputDto extends { id: string | number },
  CreateInputDto,
  UpdateInputDto,
> {
  /**
   * Nome do recurso para mensagens de erro
   */
  protected abstract readonly resourceName: string;

  /**
   * Ação de autorização para criação (ex: "bloco:create")
   */
  protected abstract readonly createAction: string;

  /**
   * Ação de autorização para atualização (ex: "bloco:update")
   */
  protected abstract readonly updateAction: string;

  /**
   * Ação de autorização para exclusão (ex: "bloco:delete")
   */
  protected abstract readonly deleteAction: string;

  /**
   * Campos do DTO que devem ser extraídos para criação
   */
  protected abstract readonly createFields: readonly (keyof CreateInputDto)[];

  /**
   * Campos do DTO que devem ser extraídos para atualização
   */
  protected abstract readonly updateFields: readonly (keyof UpdateInputDto)[];

  /**
   * Repositório para operações de persistência
   */
  protected abstract readonly repository: IBaseCrudRepositoryPort<
    Entity,
    ListOutputDto,
    FindOneOutputDto
  >;

  /**
   * Lista todos os registros
   */
  async findAll(
    accessContext: AccessContext,
    dto: ListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<ListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }

  /**
   * Busca um registro por ID
   */
  async findById(
    accessContext: AccessContext | null,
    dto: FindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }

  /**
   * Busca um registro por ID, lançando exceção se não encontrado
   */
  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: FindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new NotFoundException(`${this.resourceName} não encontrado`);
    }

    return entity;
  }

  /**
   * Busca simplificada por ID
   */
  async findByIdSimple(
    accessContext: AccessContext,
    id: string | number,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto | null> {
    if (this.repository.findByIdSimple) {
      return this.repository.findByIdSimple(accessContext, id, selection);
    }
    // Fallback para findById se findByIdSimple não estiver disponível
    return this.repository.findById(accessContext, { id }, selection);
  }

  /**
   * Busca simplificada por ID, lançando exceção se não encontrado
   */
  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string | number,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto> {
    const entity = await this.findByIdSimple(accessContext, id, selection);

    if (!entity) {
      throw new NotFoundException(`${this.resourceName} não encontrado`);
    }

    return entity;
  }

  /**
   * Cria um novo registro
   */
  async create(accessContext: AccessContext, dto: CreateInputDto): Promise<FindOneOutputDto> {
    await accessContext.ensurePermission(this.createAction as any, { dto } as any);

    const entity = this.repository.create();
    const data = pick(dto, [...this.createFields] as string[]);
    this.repository.merge(entity, data as DeepPartial<Entity>);

    // Hook para customização (ex: relacionamentos)
    await this.beforeCreate(accessContext, entity, dto);

    await this.repository.save(entity);

    return this.findByIdStrict(accessContext, { id: entity.id } as FindOneInputDto);
  }

  /**
   * Atualiza um registro existente
   */
  async update(
    accessContext: AccessContext,
    dto: FindOneInputDto & UpdateInputDto,
  ): Promise<FindOneOutputDto> {
    const current = await this.findByIdStrict(accessContext, { id: dto.id } as FindOneInputDto);

    await accessContext.ensurePermission(this.updateAction as any, { dto } as any, dto.id);

    const entity = { id: current.id } as Entity;
    const data = pick(dto, [...this.updateFields] as string[]);
    this.repository.merge(entity, data as DeepPartial<Entity>);

    // Hook para customização (ex: relacionamentos)
    await this.beforeUpdate(accessContext, entity, dto, current);

    await this.repository.save(entity);

    return this.findByIdStrict(accessContext, { id: entity.id } as FindOneInputDto);
  }

  /**
   * Remove um registro (soft delete)
   */
  async deleteOneById(accessContext: AccessContext, dto: FindOneInputDto): Promise<boolean> {
    await accessContext.ensurePermission(this.deleteAction as any, { dto } as any, dto.id);

    const entity = await this.findByIdStrict(accessContext, dto);

    if (entity) {
      await this.repository.softDeleteById(entity.id);
    }

    return true;
  }

  /**
   * Hook chamado antes de salvar uma nova entidade.
   * Override para adicionar lógica customizada (ex: relacionamentos).
   */
  protected async beforeCreate(
    _accessContext: AccessContext,
    _entity: Entity,
    _dto: CreateInputDto,
  ): Promise<void> {
    // Override em subclasses para adicionar lógica customizada
  }

  /**
   * Hook chamado antes de atualizar uma entidade.
   * Override para adicionar lógica customizada (ex: relacionamentos).
   */
  protected async beforeUpdate(
    _accessContext: AccessContext,
    _entity: Entity,
    _dto: FindOneInputDto & UpdateInputDto,
    _current: FindOneOutputDto,
  ): Promise<void> {
    // Override em subclasses para adicionar lógica customizada
  }
}
