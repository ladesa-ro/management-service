import { FilterOperator, FilterSuffix } from "nestjs-paginate";
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
  DisciplinaFindOneQuery,
  DisciplinaFindOneQueryResult,
  DisciplinaListQuery,
  DisciplinaListQueryResult,
} from "@/modules/ensino/disciplina/domain/queries";
import type { IDisciplinaRepository } from "@/modules/ensino/disciplina/domain/repositories";
import { DisciplinaEntity, disciplinaEntityDomainMapper } from "./typeorm";

const config = {
  alias: "disciplina",
  hasSoftDelete: true,
} as const;

const disciplinaPaginateConfig: ITypeOrmPaginationConfig<DisciplinaEntity> = {
  ...paginateConfig,
  relations: { diarios: true },
  sortableColumns: ["nome", "cargaHoraria"],
  searchableColumns: ["id", "nome", "nomeAbreviado", "cargaHoraria"],
  defaultSortBy: [["nome", "ASC"]],
  filterableColumns: {
    "diarios.id": [FilterOperator.EQ, FilterOperator.NULL, FilterSuffix.NOT],
  },
};

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
