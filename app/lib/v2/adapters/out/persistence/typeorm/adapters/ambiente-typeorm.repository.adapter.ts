import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { map } from "lodash";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { QbEfficientLoad } from "@/shared";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { IAmbienteRepositoryPort } from "@/v2/core/ambiente/application/ports";
import type {
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteListOutputDto,
} from "@/v2/adapters/in/http/ambiente/dto";
import type { AmbienteEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasAmbiente = "ambiente";
type DtoWithFilters = Record<string, unknown>;

@Injectable()
export class AmbienteTypeOrmRepositoryAdapter implements IAmbienteRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get ambienteRepository() {
    return this.databaseContext.ambienteRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: AmbienteListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<AmbienteListOutputDto> {
    const qb = this.ambienteRepository.createQueryBuilder(aliasAmbiente);

    await accessContext.applyFilter("ambiente:find", qb, aliasAmbiente, null);

    const config = {
      select: [
        "id",
        "nome",
        "descricao",
        "codigo",
        "capacidade",
        "tipo",
        "dateCreated",
        "bloco.id",
        "bloco.campus.id",
      ],
      relations: {
        bloco: {
          campus: true,
        },
      },
      sortableColumns: [
        "nome",
        "descricao",
        "codigo",
        "capacidade",
        "tipo",
        "dateCreated",
        "bloco.id",
        "bloco.campus.id",
      ],
      searchableColumns: [
        "id",
        "nome",
        "descricao",
        "codigo",
        "capacidade",
        "tipo",
      ],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "bloco.id": [FilterOperator.EQ],
        "bloco.campus.id": [FilterOperator.EQ],
      },
    } as IPaginationConfig<AmbienteEntity>;

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("AmbienteFindOneOutput", qb, aliasAmbiente, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as AmbienteListOutputDto;
  }

  async findById(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto | null> {
    const qb = this.ambienteRepository.createQueryBuilder(aliasAmbiente);

    if (accessContext) {
      await accessContext.applyFilter("ambiente:find", qb, aliasAmbiente, null);
    }

    qb.andWhere(`${aliasAmbiente}.id = :id`, { id: dto.id });
    qb.select([]);
    QbEfficientLoad("AmbienteFindOneOutput", qb, aliasAmbiente, selection);

    return await qb.getOne() as AmbienteFindOneOutputDto | null;
  }

  async save(ambiente: DeepPartial<AmbienteEntity>): Promise<AmbienteEntity> {
    return this.ambienteRepository.save(ambiente);
  }

  create(): AmbienteEntity {
    return this.ambienteRepository.create();
  }

  merge(ambiente: AmbienteEntity, data: DeepPartial<AmbienteEntity>): void {
    this.ambienteRepository.merge(ambiente, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.ambienteRepository
      .createQueryBuilder(aliasAmbiente)
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
