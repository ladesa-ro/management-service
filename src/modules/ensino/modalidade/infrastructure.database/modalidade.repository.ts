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
  IModalidadeRepository,
  ModalidadeFindOneQuery,
  ModalidadeFindOneQueryResult,
  ModalidadeListQuery,
  ModalidadeListQueryResult,
} from "@/modules/ensino/modalidade";
import { ModalidadeEntity, modalidadeEntityDomainMapper } from "./typeorm";

const config = {
  alias: "modalidade",
  hasSoftDelete: true,
} as const;

const modalidadePaginateConfig: ITypeOrmPaginationConfig<ModalidadeEntity> = {
  ...paginateConfig,
  sortableColumns: ["nome", "slug", "dateCreated"],
  searchableColumns: ["id", "nome", "slug"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["dateCreated", "ASC"],
  ],
  filterableColumns: {},
};

@DeclareImplementation()
export class ModalidadeTypeOrmRepositoryAdapter implements IModalidadeRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: ModalidadeListQuery | null = null) {
    return typeormFindAll<ModalidadeEntity, ModalidadeListQuery, ModalidadeListQueryResult>(
      this.appTypeormConnection,
      ModalidadeEntity,
      { ...config, paginateConfig: modalidadePaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: ModalidadeFindOneQuery) {
    return typeormFindById<ModalidadeEntity, ModalidadeFindOneQuery, ModalidadeFindOneQueryResult>(
      this.appTypeormConnection,
      ModalidadeEntity,
      { ...config, paginateConfig: modalidadePaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id } as ModalidadeFindOneQuery);
  }

  create(data: Record<string, unknown>) {
    const entityData = modalidadeEntityDomainMapper.toPersistenceData(data);
    return typeormCreate(this.appTypeormConnection, ModalidadeEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = modalidadeEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, ModalidadeEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, ModalidadeEntity, config.alias, id);
  }
}
