import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { QbEfficientLoad } from "@/shared";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { IEstadoRepositoryPort } from "@/v2/core/estado/application/ports";
import type {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "@/v2/adapters/in/http/estado/dto";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasEstado = "estado";

/**
 * Tipo helper para DTOs que contêm filtros dinâmicos
 */
type DtoWithFilters = Record<string, unknown>;

/**
 * Adapter TypeORM que implementa o port de repositório de Estado
 * Encapsula toda a lógica de acesso a dados usando TypeORM e nestjs-paginate
 */
@Injectable()
export class EstadoTypeOrmRepositoryAdapter implements IEstadoRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get estadoRepository() {
    return this.databaseContext.estadoRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: EstadoListInputDto | null = null,
    selection?: string[],
  ): Promise<EstadoListOutputDto> {
    const qb = this.estadoRepository.createQueryBuilder(aliasEstado);

    await accessContext.applyFilter("estado:find", qb, aliasEstado, null);

    const config: IPaginationConfig<EstadoFindOneOutputDto> = {
      ...paginateConfig,
      select: ["id"],
      searchableColumns: ["nome", "sigla"],
      sortableColumns: ["id", "nome", "sigla"],
      defaultSortBy: [["nome", "ASC"]],
      filterableColumns: {},
    };

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("EstadoFindOneOutput", qb, aliasEstado, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as EstadoListOutputDto;
  }

  async findById(
    accessContext: AccessContext,
    dto: EstadoFindOneInputDto,
    selection?: string[],
  ): Promise<EstadoFindOneOutputDto | null> {
    const qb = this.estadoRepository.createQueryBuilder(aliasEstado);

    await accessContext.applyFilter("estado:find", qb, aliasEstado, null);
    qb.andWhere(`${aliasEstado}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("EstadoFindOneOutput", qb, aliasEstado, selection);

    const estado = await qb.getOne();

    return estado as EstadoFindOneOutputDto | null;
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
