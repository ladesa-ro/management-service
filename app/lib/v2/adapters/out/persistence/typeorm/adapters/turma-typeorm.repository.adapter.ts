import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { QbEfficientLoad } from "@/shared";
import type {
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaListInputDto,
  TurmaListOutputDto,
} from "@/v2/adapters/in/http/turma/dto";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { TurmaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { ITurmaRepositoryPort } from "@/v2/core/turma/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasTurma = "turma";
type DtoWithFilters = Record<string, unknown>;

@Injectable()
export class TurmaTypeOrmRepositoryAdapter implements ITurmaRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get turmaRepository() {
    return this.databaseContext.turmaRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: TurmaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<TurmaListOutputDto> {
    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    await accessContext.applyFilter("turma:find", qb, aliasTurma, null);

    const config = {
      ...paginateConfig,
      select: ["id", "periodo"],
      sortableColumns: [
        "periodo",
        "ambientePadraoAula.nome",
        "ambientePadraoAula.descricao",
        "ambientePadraoAula.codigo",
        "ambientePadraoAula.capacidade",
        "ambientePadraoAula.tipo",
        "curso.nome",
        "curso.nomeAbreviado",
        "curso.campus.id",
        "curso.modalidade.id",
        "curso.modalidade.nome",
      ],
      relations: {
        curso: {
          campus: true,
        },
        ambientePadraoAula: true,
      },
      searchableColumns: ["id", "periodo"],
      defaultSortBy: [["periodo", "ASC"]],
      filterableColumns: {
        "ambientePadraoAula.nome": [FilterOperator.EQ],
        "ambientePadraoAula.codigo": [FilterOperator.EQ],
        "ambientePadraoAula.capacidade": [
          FilterOperator.EQ,
          FilterOperator.GT,
          FilterOperator.GTE,
          FilterOperator.LT,
          FilterOperator.LTE,
        ],
        "ambientePadraoAula.tipo": [FilterOperator.EQ],
        "curso.id": [FilterOperator.EQ],
        "curso.nome": [FilterOperator.EQ],
        "curso.nomeAbreviado": [FilterOperator.EQ],
        "curso.campus.id": [FilterOperator.EQ],
        "curso.ofertaFormacao.id": [FilterOperator.EQ],
        "curso.ofertaFormacao.nome": [FilterOperator.EQ],
        "curso.ofertaFormacao.slug": [FilterOperator.EQ],
      },
    } as IPaginationConfig<TurmaEntity>;

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]).map(String) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("TurmaFindOneOutput", qb, aliasTurma, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as TurmaListOutputDto;
  }

  async findById(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutputDto | null> {
    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    if (accessContext) {
      await accessContext.applyFilter("turma:find", qb, aliasTurma, null);
    }

    qb.andWhere(`${aliasTurma}.id = :id`, { id: dto.id });
    qb.select([]);
    QbEfficientLoad("TurmaFindOneOutput", qb, aliasTurma, selection);

    return (await qb.getOne()) as TurmaFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<TurmaFindOneOutputDto | null> {
    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    await accessContext.applyFilter("turma:find", qb, aliasTurma, null);
    qb.andWhere(`${aliasTurma}.id = :id`, { id });
    qb.select([]);
    QbEfficientLoad("TurmaFindOneOutput", qb, aliasTurma, selection);

    return (await qb.getOne()) as TurmaFindOneOutputDto | null;
  }

  async save(turma: DeepPartial<TurmaEntity>): Promise<TurmaEntity> {
    return this.turmaRepository.save(turma);
  }

  create(): TurmaEntity {
    return this.turmaRepository.create();
  }

  merge(turma: TurmaEntity, data: DeepPartial<TurmaEntity>): void {
    this.turmaRepository.merge(turma, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.turmaRepository
      .createQueryBuilder(aliasTurma)
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
