import { FilterOperator } from "nestjs-paginate";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { paginateConfig } from "@/infrastructure.database/pagination/config/paginate-config";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormFindById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  CidadeFindOneQuery,
  CidadeFindOneQueryResult,
  CidadeListQuery,
  CidadeListQueryResult,
  ICidadeRepository,
} from "@/modules/localidades/cidade";
import { CidadeEntity } from "./typeorm/cidade.typeorm.entity";

const config = {
  alias: "cidade",
  hasSoftDelete: false,
} as const;

const cidadePaginateConfig: ITypeOrmPaginationConfig<CidadeEntity> = {
  ...paginateConfig,
  relations: {
    estado: true,
  },
  sortableColumns: ["id", "nome", "estado.nome", "estado.sigla"],
  searchableColumns: ["nome", "estado.nome", "estado.sigla"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["estado.nome", "ASC"],
  ],
  filterableColumns: {
    "estado.id": [FilterOperator.EQ],
    "estado.nome": [FilterOperator.EQ],
    "estado.sigla": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class CidadeTypeOrmRepositoryAdapter implements ICidadeRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: CidadeListQuery | null = null) {
    return typeormFindAll<CidadeEntity, CidadeListQuery, CidadeListQueryResult>(
      this.appTypeormConnection,
      CidadeEntity,
      { ...config, paginateConfig: cidadePaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: CidadeFindOneQuery) {
    return typeormFindById<CidadeEntity, CidadeFindOneQuery, CidadeFindOneQueryResult>(
      this.appTypeormConnection,
      CidadeEntity,
      { ...config, paginateConfig: cidadePaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id: Number(id) } as CidadeFindOneQuery);
  }
}
