import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormCreate,
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
  typeormUpdate,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  CampusFindOneQuery,
  CampusFindOneQueryResult,
  CampusListQuery,
  CampusListQueryResult,
} from "@/modules/ambientes/campus/domain/queries";
import { campusPaginationSpec } from "@/modules/ambientes/campus/domain/queries";
import type { ICampusRepository } from "@/modules/ambientes/campus/domain/repositories";
import { CampusEntity, campusEntityDomainMapper } from "./typeorm";

const config = {
  alias: "campus",
} as const;

const campusRelations = {
  endereco: {
    cidade: {
      estado: true,
    },
  },
};

const campusPaginateConfig = buildTypeOrmPaginateConfig<CampusEntity>(
  campusPaginationSpec,
  campusRelations,
);

@DeclareImplementation()
export class CampusTypeOrmRepositoryAdapter implements ICampusRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: CampusListQuery | null = null) {
    return typeormFindAll<CampusEntity, CampusListQuery, CampusListQueryResult>(
      this.appTypeormConnection,
      CampusEntity,
      { ...config, paginateConfig: campusPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: CampusFindOneQuery) {
    return typeormFindById<CampusEntity, CampusFindOneQuery, CampusFindOneQueryResult>(
      this.appTypeormConnection,
      CampusEntity,
      { ...config, paginateConfig: campusPaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id } as CampusFindOneQuery);
  }

  create(data: Record<string, unknown>) {
    const entityData = campusEntityDomainMapper.toPersistenceData(data);
    return typeormCreate(this.appTypeormConnection, CampusEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = campusEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, CampusEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, CampusEntity, config.alias, id);
  }
}
