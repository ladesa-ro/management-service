import { map } from "lodash";
import type { DeepPartial, Repository } from "typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import { QbEfficientLoad } from "@/v2/old/shared";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import type { DatabaseContextService } from "../context/database-context.service";

/**
 * Interface base para entidades com ID (string ou number)
 */
export interface IEntityWithId {
  id: string | number;
}

/**
 * Interface base para DTOs de entrada que contêm ID
 */
export interface IFindOneInputDto {
  id: string | number;
}

/**
 * Tipo helper para DTOs que contêm filtros dinâmicos
 */
type DtoWithFilters = Record<string, unknown>;

/**
 * Classe base abstrata para repository adapters TypeORM.
 *
 * Fornece implementações padrão para operações CRUD comuns:
 * - findAll: listagem paginada com filtros de autorização
 * - findById: busca por ID com filtros de autorização
 * - findByIdSimple: busca simplificada por ID
 * - save: salvar entidade
 * - create: criar nova instância
 * - merge: mesclar dados em entidade existente
 * - softDeleteById: exclusão lógica
 *
 * @template Entity - Tipo da entidade TypeORM
 * @template ListInputDto - Tipo do DTO de entrada para listagem
 * @template ListOutputDto - Tipo do DTO de saída para listagem
 * @template FindOneInputDto - Tipo do DTO de entrada para busca única
 * @template FindOneOutputDto - Tipo do DTO de saída para busca única
 */
export abstract class BaseTypeOrmRepositoryAdapter<
  Entity extends IEntityWithId,
  ListInputDto,
  ListOutputDto,
  FindOneInputDto extends IFindOneInputDto,
  FindOneOutputDto,
> {
  /**
   * Alias usado nas queries TypeORM (ex: "modalidade", "reserva")
   */
  protected abstract readonly alias: string;

  /**
   * Ação de autorização para filtros (ex: "modalidade:find")
   */
  protected abstract readonly authzAction: string;

  /**
   * Nome do DTO de saída para QbEfficientLoad (ex: "ModalidadeFindOneOutput")
   */
  protected abstract readonly outputDtoName: string;

  /**
   * Configuração de paginação específica do recurso
   */
  protected abstract getPaginateConfig(): IPaginationConfig<Entity>;

  /**
   * Acesso ao contexto do banco de dados
   */
  protected abstract readonly databaseContext: DatabaseContextService;

  /**
   * Adapter de paginação (pode ser undefined para recursos sem listagem)
   */
  protected abstract readonly paginationAdapter: NestJsPaginateAdapter | undefined;

  /**
   * Getter abstrato para o repositório TypeORM específico
   */
  protected abstract get repository(): Repository<Entity>;

  /**
   * Lista todos os registros com paginação e filtros de autorização
   */
  async findAll(
    accessContext: AccessContext,
    dto: ListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<ListOutputDto> {
    if (!this.paginationAdapter) {
      throw new Error(`${this.constructor.name}: paginationAdapter is required for findAll`);
    }

    const qb = this.repository.createQueryBuilder(this.alias);
    await accessContext.applyFilter(this.authzAction as any, qb, this.alias, null);

    const criteria: IPaginationCriteria = {
      ...(dto as object),
      sortBy: (dto as any)?.sortBy ? ((dto as any).sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto as DtoWithFilters | null),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, this.getPaginateConfig());

    qb.select([]);
    QbEfficientLoad(this.outputDtoName, qb, this.alias, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p: any) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as ListOutputDto;
  }

  /**
   * Busca um registro por ID com filtros de autorização
   */
  async findById(
    accessContext: AccessContext | null,
    dto: FindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto | null> {
    const qb = this.repository.createQueryBuilder(this.alias);

    if (accessContext) {
      await accessContext.applyFilter(this.authzAction as any, qb, this.alias, null);
    }

    qb.andWhere(`${this.alias}.id = :id`, { id: dto.id });
    qb.select([]);
    QbEfficientLoad(this.outputDtoName, qb, this.alias, selection);

    return (await qb.getOne()) as FindOneOutputDto | null;
  }

  /**
   * Busca simplificada por ID (wrapper para findById)
   */
  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto | null> {
    return this.findById(accessContext, { id } as FindOneInputDto, selection);
  }

  /**
   * Salva uma entidade (cria ou atualiza)
   */
  async save(entity: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(entity as Entity);
  }

  /**
   * Cria uma nova instância da entidade
   */
  create(): Entity {
    return this.repository.create();
  }

  /**
   * Mescla dados em uma entidade existente
   */
  merge(entity: Entity, data: DeepPartial<Entity>): void {
    this.repository.merge(entity, data as Entity);
  }

  /**
   * Executa exclusão lógica (soft delete) por ID
   */
  async softDeleteById(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder(this.alias)
      .update()
      .set({ dateDeleted: () => "NOW()" } as any)
      .where("id = :id", { id })
      .andWhere("dateDeleted IS NULL")
      .execute();
  }

  /**
   * Extrai filtros do formato do DTO para o formato de IPaginationCriteria
   */
  protected extractFilters(dto: DtoWithFilters | null | undefined): Record<string, string | string[]> {
    const filters: Record<string, string | string[]> = {};

    if (!dto) return filters;

    for (const [key, value] of Object.entries(dto)) {
      if (key.startsWith("filter.")) {
        if (typeof value === "string" || (Array.isArray(value) && value.every((v) => typeof v === "string"))) {
          const filterKey = key.replace("filter.", "");
          filters[filterKey] = value;
        }
      }
    }

    return filters;
  }
}
