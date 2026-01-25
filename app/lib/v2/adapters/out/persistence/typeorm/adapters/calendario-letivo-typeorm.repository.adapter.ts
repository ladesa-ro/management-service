import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { QbEfficientLoad } from "@/shared";
import type {
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
} from "@/v2/adapters/in/http/calendario-letivo/dto";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { CalendarioLetivoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { ICalendarioLetivoRepositoryPort } from "@/v2/core/calendario-letivo/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasCalendarioLetivo = "calendarioLetivo";
type DtoWithFilters = Record<string, unknown>;

@Injectable()
export class CalendarioLetivoTypeOrmRepositoryAdapter implements ICalendarioLetivoRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get calendarioLetivoRepository() {
    return this.databaseContext.calendarioLetivoRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: CalendarioLetivoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutputDto> {
    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    await accessContext.applyFilter("calendario_letivo:find", qb, aliasCalendarioLetivo, null);

    const config = {
      select: [
        "id",
        "nome",
        "ano",
        "campus",
        "ofertaFormacao",
        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",
        "ofertaFormacao.id",
        "ofertaFormacao.nome",
        "ofertaFormacao.slug",
      ],
      sortableColumns: [
        "nome",
        "ano",
        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",
        "ofertaFormacao.id",
        "ofertaFormacao.nome",
        "ofertaFormacao.slug",
      ],
      searchableColumns: ["id", "nome", "ano", "campus", "ofertaFormacao"],
      relations: {
        campus: true,
        ofertaFormacao: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
        "campus.cnpj": [FilterOperator.EQ],
        "campus.razaoSocial": [FilterOperator.EQ],
        "campus.nomeFantasia": [FilterOperator.EQ],
        "ofertaFormacao.id": [FilterOperator.EQ],
        "ofertaFormacao.nome": [FilterOperator.EQ],
        "ofertaFormacao.slug": [FilterOperator.EQ],
      },
    } as IPaginationConfig<CalendarioLetivoEntity>;

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("CalendarioLetivoFindOneOutput", qb, aliasCalendarioLetivo, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as CalendarioLetivoListOutputDto;
  }

  async findById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto | null> {
    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    await accessContext.applyFilter("calendario_letivo:find", qb, aliasCalendarioLetivo, null);

    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, { id: dto.id });
    qb.select([]);
    QbEfficientLoad("CalendarioLetivoFindOneOutput", qb, aliasCalendarioLetivo, selection);

    return (await qb.getOne()) as CalendarioLetivoFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<CalendarioLetivoFindOneOutputDto | null> {
    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    await accessContext.applyFilter("calendario_letivo:find", qb, aliasCalendarioLetivo, null);
    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, { id });
    qb.select([]);
    QbEfficientLoad("CalendarioLetivoFindOneOutput", qb, aliasCalendarioLetivo, selection);

    return (await qb.getOne()) as CalendarioLetivoFindOneOutputDto | null;
  }

  async save(
    calendarioLetivo: DeepPartial<CalendarioLetivoEntity>,
  ): Promise<CalendarioLetivoEntity> {
    return this.calendarioLetivoRepository.save(calendarioLetivo);
  }

  create(): CalendarioLetivoEntity {
    return this.calendarioLetivoRepository.create();
  }

  merge(calendarioLetivo: CalendarioLetivoEntity, data: DeepPartial<CalendarioLetivoEntity>): void {
    this.calendarioLetivoRepository.merge(calendarioLetivo, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.calendarioLetivoRepository
      .createQueryBuilder(aliasCalendarioLetivo)
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
