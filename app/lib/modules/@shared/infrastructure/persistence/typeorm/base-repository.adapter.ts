import { map } from "lodash";
import type { DataSource, DeepPartial, Repository } from "typeorm";
import type { AccessContext } from "@/modules/@core/contexto-acesso";
import type { IPaginationCriteria } from "@/modules/@shared";
import type { NestJsPaginateAdapter } from "./pagination/nestjs-paginate.adapter";
import type { ITypeOrmPaginationConfig } from "./pagination-config.types";
import { QbEfficientLoad } from "./qb-efficient-load";

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
 * - createFromDomain: criar entidade a partir de dados de domínio
 * - updateFromDomain: atualizar entidade a partir de dados de domínio
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
   * Nome do DTO de saída para QbEfficientLoad (ex: "ModalidadeFindOneOutputDto")
   */
  protected abstract readonly outputDtoName: string;
  /**
   * Acesso ao DataSource
   */
  protected abstract readonly dataSource: DataSource;
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
   * Cria uma nova entidade a partir de dados de domínio
   */
  async createFromDomain(data: Record<string, any>): Promise<{ id: string | number }> {
    const entity = this.repository.create(data as DeepPartial<Entity>);
    const saved = await this.repository.save(entity);
    return { id: saved.id };
  }

  /**
   * Atualiza uma entidade existente a partir de dados parciais de domínio
   */
  async updateFromDomain(id: string | number, data: Record<string, any>): Promise<void> {
    const entity = this.repository.create({ id, ...data } as DeepPartial<Entity>);
    await this.repository.save(entity);
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
   * Configuração de paginação específica do recurso
   */
  protected abstract getPaginateConfig(): ITypeOrmPaginationConfig<Entity>;

  /**
   * Extrai filtros do formato do DTO para o formato de IPaginationCriteria
   */
  protected extractFilters(
    dto: DtoWithFilters | null | undefined,
  ): Record<string, string | string[]> {
    const filters: Record<string, string | string[]> = {};

    if (!dto) return filters;

    for (const [key, value] of Object.entries(dto)) {
      if (key.startsWith("filter.")) {
        if (
          typeof value === "string" ||
          (Array.isArray(value) && value.every((v) => typeof v === "string"))
        ) {
          const filterKey = key.replace("filter.", "");
          filters[filterKey] = value;
        }
      }
    }

    return filters;
  }
}
