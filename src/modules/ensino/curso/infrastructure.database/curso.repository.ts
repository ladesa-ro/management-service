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
import { CursoEntity, cursoEntityDomainMapper } from "./typeorm";

const config = {
  alias: "curso",
  hasSoftDelete: true,
} as const;

const cursoPaginateConfig: ITypeOrmPaginationConfig<CursoEntity> = {
  ...paginateConfig,
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
    campus: {
      endereco: {
        cidade: {
          estado: true,
        },
      },
    },
    ofertaFormacao: {
      modalidade: true,
    },
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

  findAll(accessContext: IAccessContext | null, dto: CursoListQuery | null = null) {
    return typeormFindAll<CursoEntity, CursoListQuery, CursoListQueryResult>(
      this.appTypeormConnection,
      CursoEntity,
      { ...config, paginateConfig: cursoPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: CursoFindOneQuery) {
    return typeormFindById<CursoEntity, CursoFindOneQuery, CursoFindOneQueryResult>(
      this.appTypeormConnection,
      CursoEntity,
      { ...config, paginateConfig: cursoPaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id } as CursoFindOneQuery);
  }

  create(data: Record<string, unknown>) {
    const entityData = cursoEntityDomainMapper.toPersistenceData(data);
    return typeormCreate(this.appTypeormConnection, CursoEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = cursoEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, CursoEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, CursoEntity, config.alias, id);
  }
}
