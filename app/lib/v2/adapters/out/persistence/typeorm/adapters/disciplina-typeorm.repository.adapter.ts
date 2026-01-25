import { Injectable } from "@nestjs/common";
import { FilterOperator, FilterSuffix } from "nestjs-paginate";
import { map } from "lodash";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { QbEfficientLoad } from "@/shared";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { IDisciplinaRepositoryPort } from "@/v2/core/disciplina/application/ports";
import type {
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
} from "@/v2/adapters/in/http/disciplina/dto";
import type { DisciplinaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasDisciplina = "disciplina";
type DtoWithFilters = Record<string, unknown>;

@Injectable()
export class DisciplinaTypeOrmRepositoryAdapter implements IDisciplinaRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get disciplinaRepository() {
    return this.databaseContext.disciplinaRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: DisciplinaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DisciplinaListOutputDto> {
    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    await accessContext.applyFilter("disciplina:find", qb, aliasDisciplina, null);

    const config = {
      ...paginateConfig,
      relations: { diarios: true },
      select: ["id", "nome", "nomeAbreviado", "cargaHoraria"],
      sortableColumns: ["nome", "cargaHoraria"],
      searchableColumns: ["id", "nome", "nomeAbreviado", "cargaHoraria"],
      defaultSortBy: [["nome", "ASC"]],
      filterableColumns: {
        "diarios.id": [FilterOperator.EQ, FilterOperator.NULL, FilterSuffix.NOT],
      },
    } as IPaginationConfig<DisciplinaEntity>;

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("DisciplinaFindOneOutput", qb, aliasDisciplina, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as DisciplinaListOutputDto;
  }

  async findById(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null> {
    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    if (accessContext) {
      await accessContext.applyFilter("disciplina:find", qb, aliasDisciplina, null);
    }

    qb.andWhere(`${aliasDisciplina}.id = :id`, { id: dto.id });
    qb.select([]);
    QbEfficientLoad("DisciplinaFindOneOutput", qb, aliasDisciplina, selection);

    return await qb.getOne() as DisciplinaFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null> {
    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    await accessContext.applyFilter("disciplina:find", qb, aliasDisciplina, null);
    qb.andWhere(`${aliasDisciplina}.id = :id`, { id });
    qb.select([]);
    QbEfficientLoad("DisciplinaFindOneOutput", qb, aliasDisciplina, selection);

    return await qb.getOne() as DisciplinaFindOneOutputDto | null;
  }

  async save(disciplina: DeepPartial<DisciplinaEntity>): Promise<DisciplinaEntity> {
    return this.disciplinaRepository.save(disciplina);
  }

  create(): DisciplinaEntity {
    return this.disciplinaRepository.create();
  }

  merge(disciplina: DisciplinaEntity, data: DeepPartial<DisciplinaEntity>): void {
    this.disciplinaRepository.merge(disciplina, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.disciplinaRepository
      .createQueryBuilder(aliasDisciplina)
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
