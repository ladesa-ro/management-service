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
  EstadoFindOneQuery,
  EstadoFindOneQueryResult,
  EstadoListQuery,
  EstadoListQueryResult,
} from "@/modules/localidades/estado/domain/queries";
import type { IEstadoRepository } from "@/modules/localidades/estado/domain/repositories";
import { EstadoEntity, EstadoTypeormMapper } from "./typeorm";

const config = {
  alias: "estado",
  hasSoftDelete: false,
} as const;

const estadoPaginateConfig: ITypeOrmPaginationConfig<EstadoEntity> = {
  ...paginateConfig,
  searchableColumns: ["nome", "sigla"],
  sortableColumns: ["id", "nome", "sigla"],
  defaultSortBy: [["nome", "ASC"]],
  filterableColumns: {},
};

@DeclareImplementation()
export class EstadoTypeOrmRepositoryAdapter implements IEstadoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  getFindAllQueryResult(accessContext: IAccessContext | null, dto: EstadoListQuery | null = null) {
    return typeormFindAll<EstadoEntity, EstadoListQuery, EstadoListQueryResult>(
      this.appTypeormConnection,
      EstadoEntity,
      { ...config, paginateConfig: estadoPaginateConfig },
      this.paginationAdapter,
      dto,
      EstadoTypeormMapper.entityToOutput.map,
    );
  }

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: EstadoFindOneQuery) {
    return typeormFindById<EstadoEntity, EstadoFindOneQuery, EstadoFindOneQueryResult>(
      this.appTypeormConnection,
      EstadoEntity,
      { ...config, paginateConfig: estadoPaginateConfig },
      dto,
      EstadoTypeormMapper.entityToOutput.map,
    );
  }
}
