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
  AmbienteFindOneQuery,
  AmbienteFindOneQueryResult,
  AmbienteListQuery,
  AmbienteListQueryResult,
} from "@/modules/ambientes/ambiente/domain/queries";
import type { IAmbienteRepository } from "@/modules/ambientes/ambiente/domain/repositories";
import { AmbienteEntity, ambienteEntityDomainMapper } from "./typeorm";

const config = {
  alias: "ambiente",
  outputDtoName: "AmbienteFindOneQueryResult",
} as const;

const ambientePaginateConfig: ITypeOrmPaginationConfig<AmbienteEntity> = {
  ...paginateConfig,
  select: [
    "id",
    "nome",
    "descricao",
    "codigo",
    "capacidade",
    "tipo",
    "dateCreated",
    "bloco.id",
    "bloco.campus.id",
  ],
  relations: {
    bloco: {
      campus: true,
    },
  },
  sortableColumns: [
    "nome",
    "descricao",
    "codigo",
    "capacidade",
    "tipo",
    "dateCreated",
    "bloco.id",
    "bloco.campus.id",
  ],
  searchableColumns: ["id", "nome", "descricao", "codigo", "capacidade", "tipo"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["dateCreated", "ASC"],
  ],
  filterableColumns: {
    "bloco.id": [FilterOperator.EQ],
    "bloco.campus.id": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class AmbienteTypeOrmRepositoryAdapter implements IAmbienteRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: IAccessContext | null,
    dto: AmbienteListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<AmbienteEntity, AmbienteListQuery, AmbienteListQueryResult>(
      this.appTypeormConnection,
      AmbienteEntity,
      { ...config, paginateConfig: ambientePaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(
    accessContext: IAccessContext | null,
    dto: AmbienteFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<AmbienteEntity, AmbienteFindOneQuery, AmbienteFindOneQueryResult>(
      this.appTypeormConnection,
      AmbienteEntity,
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
    return this.findById(accessContext, { id } as AmbienteFindOneQuery, selection);
  }

  create(data: Record<string, unknown>) {
    const entityData = ambienteEntityDomainMapper.toPersistenceData(data);
    return typeormCreate(this.appTypeormConnection, AmbienteEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = ambienteEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, AmbienteEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, AmbienteEntity, config.alias, id);
  }
}
