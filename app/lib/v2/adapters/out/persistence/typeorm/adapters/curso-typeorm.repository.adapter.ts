import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { ICursoRepositoryPort } from "@/core/curso/application/ports";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type {
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
} from "@/server/nest/modules/curso/rest";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { CursoEntity } from "../typeorm/entities";

@Injectable()
export class CursoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    CursoEntity,
    CursoListInputDto,
    CursoListOutputDto,
    CursoFindOneInputDto,
    CursoFindOneOutputDto
  >
  implements ICursoRepositoryPort
{
  protected readonly alias = "curso";
  protected readonly authzAction = "curso:find";
  protected readonly outputDtoName = "CursoFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.cursoRepository;
  }

  protected getPaginateConfig(): IPaginationConfig<CursoEntity> {
    return {
      ...paginateConfig,
      select: ["id", "nome", "nomeAbreviado", "campus", "ofertaFormacao"],
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
      searchableColumns: ["id", "nome", "nomeAbreviado", "campus", "ofertaFormacao"],
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
    };
  }
}
