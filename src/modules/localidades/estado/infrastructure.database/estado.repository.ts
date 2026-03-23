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
  EstadoFindOneQuery,
  EstadoFindOneQueryResult,
  EstadoListQuery,
  EstadoListQueryResult,
} from "@/modules/localidades/estado/domain/queries";
import type { IEstadoRepository } from "@/modules/localidades/estado/domain/repositories";
import { EstadoEntity, estadoEntityDomainMapper } from "./typeorm";

const config = {
  alias: "estado",
  outputDtoName: "EstadoFindOneQueryResult",
  hasSoftDelete: false,
} as const;

const estadoPaginateConfig: ITypeOrmPaginationConfig<EstadoEntity> = {
  ...paginateConfig,
  select: ["id"],
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

  findAll(
    accessContext: IAccessContext | null,
    dto: EstadoListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<EstadoEntity, EstadoListQuery, EstadoListQueryResult>(
      this.appTypeormConnection,
      EstadoEntity,
      { ...config, paginateConfig: estadoPaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(
    accessContext: IAccessContext | null,
    dto: EstadoFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<EstadoEntity, EstadoFindOneQuery, EstadoFindOneQueryResult>(
      this.appTypeormConnection,
      EstadoEntity,
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
    return this.findById(accessContext, { id: Number(id) } as EstadoFindOneQuery, selection);
  }

  create(data: Record<string, unknown>) {
    const entityData = estadoEntityDomainMapper.toPersistenceData(data);
    return typeormCreate(this.appTypeormConnection, EstadoEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = estadoEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, EstadoEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, EstadoEntity, config.alias, id);
  }
}
