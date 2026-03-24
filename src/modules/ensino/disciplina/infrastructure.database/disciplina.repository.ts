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
import {
  type DisciplinaFindOneQuery,
  type DisciplinaFindOneQueryResult,
  type DisciplinaListQuery,
  type DisciplinaListQueryResult,
  disciplinaPaginationSpec,
} from "@/modules/ensino/disciplina/domain/queries";
import type { IDisciplinaRepository } from "@/modules/ensino/disciplina/domain/repositories";
import { DisciplinaEntity, disciplinaEntityDomainMapper } from "./typeorm";

const config = {
  alias: "disciplina",
  hasSoftDelete: true,
} as const;

const disciplinaRelations = { diarios: true };

const disciplinaPaginateConfig = buildTypeOrmPaginateConfig<DisciplinaEntity>(
  disciplinaPaginationSpec,
  disciplinaRelations,
);

@DeclareImplementation()
export class DisciplinaTypeOrmRepositoryAdapter implements IDisciplinaRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: DisciplinaListQuery | null = null) {
    return typeormFindAll<DisciplinaEntity, DisciplinaListQuery, DisciplinaListQueryResult>(
      this.appTypeormConnection,
      DisciplinaEntity,
      { ...config, paginateConfig: disciplinaPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: DisciplinaFindOneQuery) {
    return typeormFindById<DisciplinaEntity, DisciplinaFindOneQuery, DisciplinaFindOneQueryResult>(
      this.appTypeormConnection,
      DisciplinaEntity,
      { ...config, paginateConfig: disciplinaPaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id } as DisciplinaFindOneQuery);
  }

  create(data: Record<string, unknown>) {
    const entityData = disciplinaEntityDomainMapper.toPersistenceData(data);
    return typeormCreate(this.appTypeormConnection, DisciplinaEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = disciplinaEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, DisciplinaEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, DisciplinaEntity, config.alias, id);
  }
}
