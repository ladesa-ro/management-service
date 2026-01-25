import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { QbEfficientLoad } from "@/shared";
import type {
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
} from "@/v2/adapters/in/http/disponibilidade/dto";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { DisponibilidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { IDisponibilidadeRepositoryPort } from "@/v2/core/disponibilidade/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasDisponibilidade = "disponibilidade";
type DtoWithFilters = Record<string, unknown>;

@Injectable()
export class DisponibilidadeTypeOrmRepositoryAdapter implements IDisponibilidadeRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get disponibilidadeRepository() {
    return this.databaseContext.disponibilidadeRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: DisponibilidadeListInputDto | null = null,
    selection?: string[],
  ): Promise<DisponibilidadeListOutputDto> {
    const qb = this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade);

    await accessContext.applyFilter("disponibilidade:find", qb, aliasDisponibilidade, null);

    const config = {
      ...paginateConfig,
      select: ["id", "dataInicio", "dataFim", "dateCreated"],
      sortableColumns: ["dataInicio", "dataFim", "dateCreated"],
      searchableColumns: ["id", "dataInicio", "dataFim"],
      defaultSortBy: [
        ["dataInicio", "ASC"],
        ["dataFim", "ASC"],
      ],
      filterableColumns: {},
    } as IPaginationConfig<DisponibilidadeEntity>;

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("DisponibilidadeFindOneOutput", qb, aliasDisponibilidade, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as DisponibilidadeListOutputDto;
  }

  async findById(
    accessContext: AccessContext | null,
    dto: DisponibilidadeFindOneInputDto,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto | null> {
    const qb = this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade);

    if (accessContext) {
      await accessContext.applyFilter("disponibilidade:find", qb, aliasDisponibilidade, null);
    }

    qb.andWhere(`${aliasDisponibilidade}.id = :id`, { id: dto.id });
    qb.select([]);
    QbEfficientLoad("DisponibilidadeFindOneOutput", qb, aliasDisponibilidade, selection);

    return (await qb.getOne()) as DisponibilidadeFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto | null> {
    const qb = this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade);

    await accessContext.applyFilter("disponibilidade:find", qb, aliasDisponibilidade, null);
    qb.andWhere(`${aliasDisponibilidade}.id = :id`, { id });
    qb.select([]);
    QbEfficientLoad("DisponibilidadeFindOneOutput", qb, aliasDisponibilidade, selection);

    return (await qb.getOne()) as DisponibilidadeFindOneOutputDto | null;
  }

  async save(disponibilidade: DeepPartial<DisponibilidadeEntity>): Promise<DisponibilidadeEntity> {
    return this.disponibilidadeRepository.save(disponibilidade);
  }

  create(): DisponibilidadeEntity {
    return this.disponibilidadeRepository.create();
  }

  merge(disponibilidade: DisponibilidadeEntity, data: DeepPartial<DisponibilidadeEntity>): void {
    this.disponibilidadeRepository.merge(disponibilidade, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.disponibilidadeRepository
      .createQueryBuilder(aliasDisponibilidade)
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
