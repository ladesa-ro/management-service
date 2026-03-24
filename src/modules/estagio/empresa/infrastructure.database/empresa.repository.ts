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
  EmpresaFindOneQuery,
  EmpresaFindOneQueryResult,
  EmpresaListQuery,
  EmpresaListQueryResult,
} from "@/modules/estagio/empresa/domain/queries";
import { empresaPaginationSpec } from "@/modules/estagio/empresa/domain/queries";
import type { IEmpresaRepository } from "@/modules/estagio/empresa/domain/repositories";
import { EmpresaTypeormEntity, empresaEntityDomainMapper } from "./typeorm";

const config = {
  alias: "empresa",
} as const;

const empresaRelations = {
  endereco: {
    cidade: {
      estado: true,
    },
  },
};

const empresaPaginateConfig = buildTypeOrmPaginateConfig<EmpresaTypeormEntity>(
  empresaPaginationSpec,
  empresaRelations,
);

@DeclareImplementation()
export class EmpresaTypeOrmRepositoryAdapter implements IEmpresaRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: EmpresaListQuery | null = null) {
    return typeormFindAll<EmpresaTypeormEntity, EmpresaListQuery, EmpresaListQueryResult>(
      this.appTypeormConnection,
      EmpresaTypeormEntity,
      { ...config, paginateConfig: empresaPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: EmpresaFindOneQuery) {
    return typeormFindById<EmpresaTypeormEntity, EmpresaFindOneQuery, EmpresaFindOneQueryResult>(
      this.appTypeormConnection,
      EmpresaTypeormEntity,
      { ...config, paginateConfig: empresaPaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id } as EmpresaFindOneQuery);
  }

  create(data: Record<string, unknown>) {
    const entityData = empresaEntityDomainMapper.toPersistenceData(data) as Record<string, unknown>;
    return typeormCreate(this.appTypeormConnection, EmpresaTypeormEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = empresaEntityDomainMapper.toPersistenceData(data) as Record<string, unknown>;
    return typeormUpdate(this.appTypeormConnection, EmpresaTypeormEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, EmpresaTypeormEntity, config.alias, id);
  }
}
