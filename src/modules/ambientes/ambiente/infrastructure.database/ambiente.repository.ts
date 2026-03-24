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
  AmbienteFindOneQuery,
  AmbienteFindOneQueryResult,
  AmbienteListQuery,
  AmbienteListQueryResult,
} from "@/modules/ambientes/ambiente/domain/queries";
import { ambientePaginationSpec } from "@/modules/ambientes/ambiente/domain/queries";
import type { IAmbienteRepository } from "@/modules/ambientes/ambiente/domain/repositories";
import { AmbienteEntity, ambienteEntityDomainMapper } from "./typeorm";

const config = {
  alias: "ambiente",
} as const;

const ambienteRelations = {
  bloco: {
    campus: {
      endereco: {
        cidade: {
          estado: true,
        },
      },
    },
  },
};

const ambientePaginateConfig = buildTypeOrmPaginateConfig<AmbienteEntity>(
  ambientePaginationSpec,
  ambienteRelations,
);

@DeclareImplementation()
export class AmbienteTypeOrmRepositoryAdapter implements IAmbienteRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: AmbienteListQuery | null = null) {
    return typeormFindAll<AmbienteEntity, AmbienteListQuery, AmbienteListQueryResult>(
      this.appTypeormConnection,
      AmbienteEntity,
      { ...config, paginateConfig: ambientePaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: AmbienteFindOneQuery) {
    return typeormFindById<AmbienteEntity, AmbienteFindOneQuery, AmbienteFindOneQueryResult>(
      this.appTypeormConnection,
      AmbienteEntity,
      { ...config, paginateConfig: ambientePaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id } as AmbienteFindOneQuery);
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
