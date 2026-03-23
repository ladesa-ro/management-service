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
  BlocoFindOneQuery,
  BlocoFindOneQueryResult,
  BlocoListQuery,
  BlocoListQueryResult,
} from "@/modules/ambientes/bloco/domain/queries";
import type { IBlocoRepository } from "@/modules/ambientes/bloco/domain/repositories";
import { BlocoEntity, blocoEntityDomainMapper } from "./typeorm";

const config = {
  alias: "bloco",
  outputDtoName: "BlocoFindOneQueryResult",
} as const;

const blocoPaginateConfig: ITypeOrmPaginationConfig<BlocoEntity> = {
  ...paginateConfig,
  select: [
    "id",
    "nome",
    "codigo",
    "dateCreated",
    "campus.id",
    "campus.razaoSocial",
    "campus.nomeFantasia",
  ],
  relations: {
    campus: true,
  },
  sortableColumns: [
    "nome",
    "codigo",
    "dateCreated",
    "campus.id",
    "campus.razaoSocial",
    "campus.nomeFantasia",
  ],
  searchableColumns: ["id", "nome", "codigo"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["dateCreated", "ASC"],
  ],
  filterableColumns: {
    "campus.id": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class BlocoTypeOrmRepositoryAdapter implements IBlocoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: IAccessContext | null,
    dto: BlocoListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<BlocoEntity, BlocoListQuery, BlocoListQueryResult>(
      this.appTypeormConnection,
      BlocoEntity,
      { ...config, paginateConfig: blocoPaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(
    accessContext: IAccessContext | null,
    dto: BlocoFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<BlocoEntity, BlocoFindOneQuery, BlocoFindOneQueryResult>(
      this.appTypeormConnection,
      BlocoEntity,
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
    return this.findById(accessContext, { id } as BlocoFindOneQuery, selection);
  }

  create(data: Record<string, unknown>) {
    const entityData = blocoEntityDomainMapper.toPersistenceData(data);
    return typeormCreate(this.appTypeormConnection, BlocoEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = blocoEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, BlocoEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, BlocoEntity, config.alias, id);
  }
}
