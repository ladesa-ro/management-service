import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { map } from "lodash";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { QbEfficientLoad } from "@/shared";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { IEtapaRepositoryPort } from "@/v2/core/etapa/application/ports";
import type {
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
} from "@/v2/adapters/in/http/etapa/dto";
import type { EtapaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/etapa.entity";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasEtapa = "etapa";
type DtoWithFilters = Record<string, unknown>;

@Injectable()
export class EtapaTypeOrmRepositoryAdapter implements IEtapaRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get etapaRepository() {
    return this.databaseContext.etapaRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: EtapaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<EtapaListOutputDto> {
    const qb = this.etapaRepository.createQueryBuilder(aliasEtapa);

    await accessContext.applyFilter("etapa:find", qb, aliasEtapa, null);

    const config = {
      select: [
        "id",
        "numero",
        "dataInicio",
        "dataTermino",
        "cor",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      sortableColumns: [
        "numero",
        "dataInicio",
        "dataInicio",
        "cor",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: [
        "id",
        "numero",
        "dataInicio",
        "dataTermino",
        "cor",
      ],
      relations: {
        calendario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "calendario.id": [FilterOperator.EQ],
        "calendario.nome": [FilterOperator.EQ],
        "calendario.ano": [FilterOperator.EQ],
      },
    } as IPaginationConfig<EtapaEntity>;

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("EtapaFindOneOutput", qb, aliasEtapa, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as EtapaListOutputDto;
  }

  async findById(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutputDto | null> {
    const qb = this.etapaRepository.createQueryBuilder(aliasEtapa);

    await accessContext.applyFilter("etapa:find", qb, aliasEtapa, null);

    qb.andWhere(`${aliasEtapa}.id = :id`, { id: dto.id });
    qb.select([]);
    QbEfficientLoad("EtapaFindOneOutput", qb, aliasEtapa, selection);

    return await qb.getOne() as EtapaFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutputDto | null> {
    const qb = this.etapaRepository.createQueryBuilder(aliasEtapa);

    await accessContext.applyFilter("etapa:find", qb, aliasEtapa, null);
    qb.andWhere(`${aliasEtapa}.id = :id`, { id });
    qb.select([]);
    QbEfficientLoad("EtapaFindOneOutput", qb, aliasEtapa, selection);

    return await qb.getOne() as EtapaFindOneOutputDto | null;
  }

  async save(etapa: DeepPartial<EtapaEntity>): Promise<EtapaEntity> {
    return this.etapaRepository.save(etapa);
  }

  create(): EtapaEntity {
    return this.etapaRepository.create();
  }

  merge(etapa: EtapaEntity, data: DeepPartial<EtapaEntity>): void {
    this.etapaRepository.merge(etapa, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.etapaRepository
      .createQueryBuilder(aliasEtapa)
      .update()
      .set({ dateDeleted: "NOW()" })
      .where("id = :id", { id })
      .andWhere("dateDeleted IS NULL")
      .execute();
  }

  private extractFilters(dto: DtoWithFilters | null | undefined): Record<string, string | string[]> {
    const filters: Record<string, string | string[]> = {};
    if (!dto) return filters;
    for (const [key, value] of Object.entries(dto)) {
      if (key.startsWith("filter.") && (typeof value === "string" || (Array.isArray(value) && value.every(v => typeof v === "string")))) {
        filters[key.replace("filter.", "")] = value;
      }
    }
    return filters;
  }
}
