import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { map } from "lodash";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { QbEfficientLoad } from "@/shared";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { ICursoRepositoryPort } from "@/v2/core/curso/application/ports";
import type {
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
} from "@/v2/adapters/in/http/curso/dto";
import type { CursoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasCurso = "curso";

type DtoWithFilters = Record<string, unknown>;

@Injectable()
export class CursoTypeOrmRepositoryAdapter implements ICursoRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get cursoRepository() {
    return this.databaseContext.cursoRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: CursoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<CursoListOutputDto> {
    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    await accessContext.applyFilter("curso:find", qb, aliasCurso, null);

    const config = {
      ...paginateConfig,
      select: [
        "id",
        "nome",
        "nomeAbreviado",
        "campus",
        "ofertaFormacao",
      ],
      sortableColumns: [
        "nome",
        "nomeAbreviado",
        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",
        "ofertaFormacao.id",
        "ofertaFormacao.nome",
        "ofertaFormacao.slug",
      ],
      searchableColumns: [
        "id",
        "nome",
        "nomeAbreviado",
        "campus",
        "ofertaFormacao",
      ],
      relations: {
        campus: true,
        ofertaFormacao: true,
      },
      defaultSortBy: [["nome", "ASC"]],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
        "campus.cnpj": [FilterOperator.EQ],
        "campus.razaoSocial": [FilterOperator.EQ],
        "campus.nomeFantasia": [FilterOperator.EQ],
        "ofertaFormacao.id": [FilterOperator.EQ],
        "ofertaFormacao.nome": [FilterOperator.EQ],
        "ofertaFormacao.slug": [FilterOperator.EQ],
      },
    } as IPaginationConfig<CursoEntity>;

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("CursoFindOneOutput", qb, aliasCurso, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as CursoListOutputDto;
  }

  async findById(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto | null> {
    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    if (accessContext) {
      await accessContext.applyFilter("curso:find", qb, aliasCurso, null);
    }

    qb.andWhere(`${aliasCurso}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("CursoFindOneOutput", qb, aliasCurso, selection);

    const curso = await qb.getOne();

    return curso as CursoFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<CursoFindOneOutputDto | null> {
    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    await accessContext.applyFilter("curso:find", qb, aliasCurso, null);
    qb.andWhere(`${aliasCurso}.id = :id`, { id });

    qb.select([]);
    QbEfficientLoad("CursoFindOneOutput", qb, aliasCurso, selection);

    const curso = await qb.getOne();

    return curso as CursoFindOneOutputDto | null;
  }

  async save(curso: DeepPartial<CursoEntity>): Promise<CursoEntity> {
    return this.cursoRepository.save(curso);
  }

  create(): CursoEntity {
    return this.cursoRepository.create();
  }

  merge(curso: CursoEntity, data: DeepPartial<CursoEntity>): void {
    this.cursoRepository.merge(curso, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.cursoRepository
      .createQueryBuilder(aliasCurso)
      .update()
      .set({
        dateDeleted: "NOW()",
      })
      .where("id = :id", { id })
      .andWhere("dateDeleted IS NULL")
      .execute();
  }

  private extractFilters(dto: DtoWithFilters | null | undefined): Record<string, string | string[]> {
    const filters: Record<string, string | string[]> = {};
    if (!dto) return filters;

    for (const [key, value] of Object.entries(dto)) {
      if (key.startsWith("filter.")) {
        if (typeof value === "string" || (Array.isArray(value) && value.every(v => typeof v === "string"))) {
          filters[key.replace("filter.", "")] = value;
        }
      }
    }
    return filters;
  }
}
