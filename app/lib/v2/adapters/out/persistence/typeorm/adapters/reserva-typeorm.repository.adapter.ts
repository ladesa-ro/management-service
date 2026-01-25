import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { map } from "lodash";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { QbEfficientLoad } from "@/shared";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { IReservaRepositoryPort } from "@/v2/core/reserva/application/ports";
import type {
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
} from "@/v2/adapters/in/http/reserva/dto";
import type { ReservaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasReserva = "reserva";
type DtoWithFilters = Record<string, unknown>;

@Injectable()
export class ReservaTypeOrmRepositoryAdapter implements IReservaRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get reservaRepository() {
    return this.databaseContext.reservaRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: ReservaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<ReservaListOutputDto> {
    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    await accessContext.applyFilter("reserva:find", qb, aliasReserva, null);

    const config = {
      select: ["id"],
      sortableColumns: [
        "situacao",
        "motivo",
        "tipo",
        "rrule",
        "ambiente.id",
        "ambiente.nome",
        "ambiente.capacidade",
        "ambiente.bloco.codigo",
        "ambiente.bloco.nome",
      ],
      searchableColumns: [
        "id",
        "situacao",
        "motivo",
        "tipo",
        "rrule",
        "ambiente.nome",
        "ambiente.descricao",
        "ambiente.codigo",
        "ambiente.bloco.nome",
        "ambiente.bloco.codigo",
      ],
      relations: {
        ambiente: {
          bloco: {
            campus: true,
          },
        },
        usuario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        situacao: [FilterOperator.EQ],
        tipo: [FilterOperator.EQ],
        "ambiente.id": [FilterOperator.EQ],
        "ambiente.bloco.id": [FilterOperator.EQ],
        "ambiente.bloco.campus.id": [FilterOperator.EQ],
      },
    } as IPaginationConfig<ReservaEntity>;

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("ReservaFindOneOutput", qb, aliasReserva, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as ReservaListOutputDto;
  }

  async findById(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutputDto | null> {
    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    await accessContext.applyFilter("reserva:find", qb, aliasReserva, null);

    qb.andWhere(`${aliasReserva}.id = :id`, { id: dto.id });
    qb.select([]);
    QbEfficientLoad("ReservaFindOneOutput", qb, aliasReserva, selection);

    return await qb.getOne() as ReservaFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ReservaFindOneOutputDto | null> {
    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    await accessContext.applyFilter("reserva:find", qb, aliasReserva, null);
    qb.andWhere(`${aliasReserva}.id = :id`, { id });
    qb.select([]);
    QbEfficientLoad("ReservaFindOneOutput", qb, aliasReserva, selection);

    return await qb.getOne() as ReservaFindOneOutputDto | null;
  }

  async save(reserva: DeepPartial<ReservaEntity>): Promise<ReservaEntity> {
    return this.reservaRepository.save(reserva);
  }

  create(): ReservaEntity {
    return this.reservaRepository.create();
  }

  merge(reserva: ReservaEntity, data: DeepPartial<ReservaEntity>): void {
    this.reservaRepository.merge(reserva, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.reservaRepository
      .createQueryBuilder(aliasReserva)
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
