import { FilterOperator } from "nestjs-paginate";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { paginateConfig } from "@/infrastructure.database/pagination/config/paginate-config";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormCreate,
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
  typeormUpdate,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  CursoFindOneQuery,
  CursoFindOneQueryResult,
  CursoListQuery,
  CursoListQueryResult,
} from "@/modules/ensino/curso/domain/queries";
import type { ICursoRepository } from "@/modules/ensino/curso/domain/repositories";
import { CursoEntity } from "./typeorm/curso.typeorm.entity";

const config = {
  alias: "curso",
  outputDtoName: "CursoFindOneQueryResult",
  hasSoftDelete: true,
} as const;

const cursoPaginateConfig: ITypeOrmPaginationConfig<CursoEntity> = {
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

@DeclareImplementation()
export class CursoTypeOrmRepositoryAdapter implements ICursoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: IAccessContext | null,
    dto: CursoListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<CursoEntity, CursoListQuery, CursoListQueryResult>(
      this.appTypeormConnection,
      CursoEntity,
      { ...config, paginateConfig: cursoPaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(
    accessContext: IAccessContext | null,
    dto: CursoFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<CursoEntity, CursoFindOneQuery, CursoFindOneQueryResult>(
      this.appTypeormConnection,
      CursoEntity,
      config,
      dto,
      selection,
    );
  }

  findByIdSimple(
    accessContext: IAccessContext | null,
    id: string,
    selection?: string[] | boolean | null,
  ) {
    return this.findById(accessContext, { id } as CursoFindOneQuery, selection);
  }

  create(data: Record<string, unknown>) {
    return typeormCreate(this.appTypeormConnection, CursoEntity, data);
  }

  update(id: string | number, data: Record<string, unknown>) {
    return typeormUpdate(this.appTypeormConnection, CursoEntity, id, data);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, CursoEntity, config.alias, id);
  }
}
