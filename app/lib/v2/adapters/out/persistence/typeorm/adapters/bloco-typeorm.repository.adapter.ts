import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { QbEfficientLoad } from "@/shared";
import type {
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
} from "@/v2/adapters/in/http/bloco/dto";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { BlocoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { IBlocoRepositoryPort } from "@/v2/core/bloco/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasBloco = "bloco";

/**
 * Tipo helper para DTOs que contêm filtros dinâmicos
 */
type DtoWithFilters = Record<string, unknown>;

/**
 * Adapter TypeORM que implementa o port de repositório de Bloco
 * Encapsula toda a lógica de acesso a dados usando TypeORM e nestjs-paginate
 */
@Injectable()
export class BlocoTypeOrmRepositoryAdapter implements IBlocoRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get blocoRepository() {
    return this.databaseContext.blocoRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: BlocoListInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoListOutputDto> {
    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    await accessContext.applyFilter("bloco:find", qb, aliasBloco, null);

    const config = {
      ...paginateConfig,
      select: [
        "id",
        "nome",
        "codigo",
        "dateCreated",
        "campus.id",
        "campus.razaoSocial",
        "campus.nomeFantasia",
      ],
      relations: {
        campus: true,
      },
      sortableColumns: [
        "nome",
        "codigo",
        "dateCreated",
        "campus.id",
        "campus.razaoSocial",
        "campus.nomeFantasia",
      ],
      searchableColumns: ["id", "nome", "codigo"],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
      },
    } as IPaginationConfig<BlocoEntity>;

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("BlocoFindOneOutput", qb, aliasBloco, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as BlocoListOutputDto;
  }

  async findById(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto | null> {
    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    if (accessContext) {
      await accessContext.applyFilter("bloco:find", qb, aliasBloco, null);
    }

    qb.andWhere(`${aliasBloco}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("BlocoFindOneOutput", qb, aliasBloco, selection);

    const bloco = await qb.getOne();

    return bloco as BlocoFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutputDto | null> {
    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    await accessContext.applyFilter("bloco:find", qb, aliasBloco, null);
    qb.andWhere(`${aliasBloco}.id = :id`, { id });

    qb.select([]);
    QbEfficientLoad("BlocoFindOneOutput", qb, aliasBloco, selection);

    const bloco = await qb.getOne();

    return bloco as BlocoFindOneOutputDto | null;
  }

  async save(bloco: DeepPartial<BlocoEntity>): Promise<BlocoEntity> {
    return this.blocoRepository.save(bloco);
  }

  create(): BlocoEntity {
    return this.blocoRepository.create();
  }

  merge(bloco: BlocoEntity, data: DeepPartial<BlocoEntity>): void {
    this.blocoRepository.merge(bloco, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.blocoRepository
      .createQueryBuilder(aliasBloco)
      .update()
      .set({
        dateDeleted: "NOW()",
      })
      .where("id = :id", { id })
      .andWhere("dateDeleted IS NULL")
      .execute();
  }

  /**
   * Extrai filtros do formato do DTO para o formato de IPaginationCriteria
   */
  private extractFilters(
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
