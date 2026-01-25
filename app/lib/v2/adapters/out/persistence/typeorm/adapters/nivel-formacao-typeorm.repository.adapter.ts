import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { QbEfficientLoad } from "@/shared";
import type {
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
} from "@/v2/adapters/in/http/nivel-formacao/dto";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { NivelFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { INivelFormacaoRepositoryPort } from "@/v2/core/nivel-formacao/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasNivelFormacao = "nivel_formacao";

/**
 * Tipo helper para DTOs que contêm filtros dinâmicos
 */
type DtoWithFilters = Record<string, unknown>;

/**
 * Adapter TypeORM que implementa o port de repositório de NivelFormacao
 * Encapsula toda a lógica de acesso a dados usando TypeORM e nestjs-paginate
 */
@Injectable()
export class NivelFormacaoTypeOrmRepositoryAdapter implements INivelFormacaoRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get nivelFormacaoRepository() {
    return this.databaseContext.nivelFormacaoRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: NivelFormacaoListInputDto | null = null,
    selection?: string[],
  ): Promise<NivelFormacaoListOutputDto> {
    const qb = this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao);

    await accessContext.applyFilter("nivel_formacao:find", qb, aliasNivelFormacao, null);

    const config: IPaginationConfig<NivelFormacaoFindOneOutputDto> = {
      ...paginateConfig,
      select: ["id", "slug", "dateCreated"],
      sortableColumns: ["slug", "dateCreated"],
      searchableColumns: ["id", "slug"],
      defaultSortBy: [
        ["slug", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {},
    };

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("NivelFormacaoFindOneOutput", qb, aliasNivelFormacao, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as NivelFormacaoListOutputDto;
  }

  async findById(
    accessContext: AccessContext | null,
    dto: NivelFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto | null> {
    const qb = this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao);

    if (accessContext) {
      await accessContext.applyFilter("nivel_formacao:find", qb, aliasNivelFormacao, null);
    }

    qb.andWhere(`${aliasNivelFormacao}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("NivelFormacaoFindOneOutput", qb, aliasNivelFormacao, selection);

    const nivelFormacao = await qb.getOne();

    return nivelFormacao as NivelFormacaoFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto | null> {
    const qb = this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao);

    await accessContext.applyFilter("nivel_formacao:find", qb, aliasNivelFormacao, null);
    qb.andWhere(`${aliasNivelFormacao}.id = :id`, { id });

    qb.select([]);
    QbEfficientLoad("NivelFormacaoFindOneOutput", qb, aliasNivelFormacao, selection);

    const nivelFormacao = await qb.getOne();

    return nivelFormacao as NivelFormacaoFindOneOutputDto | null;
  }

  async save(nivelFormacao: DeepPartial<NivelFormacaoEntity>): Promise<NivelFormacaoEntity> {
    return this.nivelFormacaoRepository.save(nivelFormacao);
  }

  create(): NivelFormacaoEntity {
    return this.nivelFormacaoRepository.create();
  }

  merge(nivelFormacao: NivelFormacaoEntity, data: DeepPartial<NivelFormacaoEntity>): void {
    this.nivelFormacaoRepository.merge(nivelFormacao, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.nivelFormacaoRepository
      .createQueryBuilder(aliasNivelFormacao)
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
