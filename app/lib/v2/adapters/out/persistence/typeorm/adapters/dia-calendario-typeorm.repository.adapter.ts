import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { QbEfficientLoad } from "@/shared";
import type {
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
} from "@/v2/adapters/in/http/dia-calendario/dto";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { DiaCalendarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/dia-calendario.entity";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { IDiaCalendarioRepositoryPort } from "@/v2/core/dia-calendario/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasDiaCalendario = "diaCalendario";
type DtoWithFilters = Record<string, unknown>;

@Injectable()
export class DiaCalendarioTypeOrmRepositoryAdapter implements IDiaCalendarioRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get diaCalendarioRepository() {
    return this.databaseContext.diaCalendarioRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: DiaCalendarioListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioListOutputDto> {
    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    await accessContext.applyFilter("dia_calendario:find", qb, aliasDiaCalendario, null);

    const config = {
      select: [
        "id",
        "data",
        "diaLetivo",
        "feriado",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
        "diaPresencial",
        "tipo",
        "extraCurricular",
      ],
      sortableColumns: [
        "data",
        "diaLetivo",
        "feriado",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: ["id", "data", "diaLetivo", "feriado", "calendario.nome"],
      relations: {
        calendario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "calendario.id": [FilterOperator.EQ],
        "calendario.nome": [FilterOperator.EQ],
        "calendario.ano": [FilterOperator.EQ],
      },
    } as IPaginationConfig<DiaCalendarioEntity>;

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("DiaCalendarioFindOneOutput", qb, aliasDiaCalendario, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as DiaCalendarioListOutputDto;
  }

  async findById(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto | null> {
    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    await accessContext.applyFilter("dia_calendario:find", qb, aliasDiaCalendario, null);

    qb.andWhere(`${aliasDiaCalendario}.id = :id`, { id: dto.id });
    qb.select([]);
    QbEfficientLoad("DiaCalendarioFindOneOutput", qb, aliasDiaCalendario, selection);

    return (await qb.getOne()) as DiaCalendarioFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiaCalendarioFindOneOutputDto | null> {
    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    await accessContext.applyFilter("dia_calendario:find", qb, aliasDiaCalendario, null);
    qb.andWhere(`${aliasDiaCalendario}.id = :id`, { id });
    qb.select([]);
    QbEfficientLoad("DiaCalendarioFindOneOutput", qb, aliasDiaCalendario, selection);

    return (await qb.getOne()) as DiaCalendarioFindOneOutputDto | null;
  }

  async save(diaCalendario: DeepPartial<DiaCalendarioEntity>): Promise<DiaCalendarioEntity> {
    return this.diaCalendarioRepository.save(diaCalendario);
  }

  create(): DiaCalendarioEntity {
    return this.diaCalendarioRepository.create();
  }

  merge(diaCalendario: DiaCalendarioEntity, data: DeepPartial<DiaCalendarioEntity>): void {
    this.diaCalendarioRepository.merge(diaCalendario, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.diaCalendarioRepository
      .createQueryBuilder(aliasDiaCalendario)
      .update()
      .set({ dateDeleted: "NOW()" })
      .where("id = :id", { id })
      .andWhere("dateDeleted IS NULL")
      .execute();
  }

  private extractFilters(
    dto: DtoWithFilters | null | undefined,
  ): Record<string, string | string[]> {
    const filters: Record<string, string | string[]> = {};
    if (!dto) return filters;
    for (const [key, value] of Object.entries(dto)) {
      if (
        key.startsWith("filter.") &&
        (typeof value === "string" ||
          (Array.isArray(value) && value.every((v) => typeof v === "string")))
      ) {
        filters[key.replace("filter.", "")] = value;
      }
    }
    return filters;
  }
}
