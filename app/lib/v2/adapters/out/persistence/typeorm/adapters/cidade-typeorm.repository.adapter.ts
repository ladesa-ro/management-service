import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { map } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { QbEfficientLoad } from "@/shared";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { ICidadeRepositoryPort } from "@/v2/core/cidade/application/ports";
import type {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/v2/adapters/in/http/cidade/dto";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasCidade = "cidade";

/**
 * Tipo helper para DTOs que contêm filtros dinâmicos
 */
type DtoWithFilters = Record<string, unknown>;

/**
 * Adapter TypeORM que implementa o port de repositório de Cidade
 * Encapsula toda a lógica de acesso a dados usando TypeORM e nestjs-paginate
 */
@Injectable()
export class CidadeTypeOrmRepositoryAdapter implements ICidadeRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get cidadeRepository() {
    return this.databaseContext.cidadeRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: CidadeListInputDto | null = null,
    selection?: string[],
  ): Promise<CidadeListOutputDto> {
    const qb = this.cidadeRepository.createQueryBuilder(aliasCidade);

    await accessContext.applyFilter("cidade:find", qb, aliasCidade, null);

    const config: IPaginationConfig<CidadeFindOneOutputDto> = {
      ...paginateConfig,
      select: [
        "id",
        "nome",
        "estado.id",
        "estado.sigla",
        "estado.nome",
      ],
      relations: {
        estado: true,
      },
      sortableColumns: ["id", "nome", "estado.nome", "estado.sigla"],
      searchableColumns: ["nome", "estado.nome", "estado.sigla"],
      defaultSortBy: [
        ["nome", "ASC"],
        ["estado.nome", "ASC"],
      ],
      filterableColumns: {
        "estado.id": [FilterOperator.EQ],
        "estado.nome": [FilterOperator.EQ],
        "estado.sigla": [FilterOperator.EQ],
      },
    };

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("CidadeFindOneOutput", qb, aliasCidade, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as CidadeListOutputDto;
  }

  async findById(
    accessContext: AccessContext,
    dto: CidadeFindOneInputDto,
    selection?: string[],
  ): Promise<CidadeFindOneOutputDto | null> {
    const qb = this.cidadeRepository.createQueryBuilder(aliasCidade);

    await accessContext.applyFilter("cidade:find", qb, aliasCidade, null);
    qb.andWhere(`${aliasCidade}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("CidadeFindOneOutput", qb, aliasCidade, selection);

    const cidade = await qb.getOne();

    return cidade as CidadeFindOneOutputDto | null;
  }

  /**
   * Extrai filtros do formato do DTO para o formato de IPaginationCriteria
   */
  private extractFilters(dto: DtoWithFilters | null | undefined): Record<string, string | string[]> {
    const filters: Record<string, string | string[]> = {};

    if (!dto) return filters;

    for (const [key, value] of Object.entries(dto)) {
      if (key.startsWith("filter.")) {
        if (typeof value === "string" || (Array.isArray(value) && value.every(v => typeof v === "string"))) {
          const filterKey = key.replace("filter.", "");
          filters[filterKey] = value;
        }
      }
    }

    return filters;
  }
}
