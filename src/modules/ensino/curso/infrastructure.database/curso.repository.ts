import { FilterOperator } from "nestjs-paginate";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  BaseTypeOrmRepositoryAdapter,
  IAppTypeormConnection,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  CursoFindOneQuery,
  CursoFindOneQueryResult,
  CursoListQuery,
  CursoListQueryResult,
} from "@/modules/ensino/curso/domain/queries";
import type { ICursoRepository } from "@/modules/ensino/curso/domain/repositories";
import type { CursoEntity } from "./typeorm/curso.typeorm.entity";
import { createCursoRepository } from "./typeorm/curso.typeorm.repository";

@DeclareImplementation()
export class CursoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    CursoEntity,
    CursoListQuery,
    CursoListQueryResult,
    CursoFindOneQuery,
    CursoFindOneQueryResult
  >
  implements ICursoRepository
{
  protected readonly alias = "curso";
  protected readonly outputDtoName = "CursoFindOneQueryResult";

  constructor(
    @DeclareDependency(IAppTypeormConnection)
    protected readonly appTypeormConnection: IAppTypeormConnection,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createCursoRepository(this.appTypeormConnection);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<CursoEntity> {
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
