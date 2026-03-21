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
import { ModalidadeEntity } from "./typeorm/modalidade.typeorm.entity";

const config = {
  alias: "modalidade",
  outputDtoName: "ModalidadeFindOneQueryResult",
  hasSoftDelete: true,
} as const;

const modalidadePaginateConfig: ITypeOrmPaginationConfig<ModalidadeEntity> = {
  ...paginateConfig,
  select: ["id", "nome", "slug", "dateCreated"],
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

  findAll(
    accessContext: unknown,
    dto: ModalidadeListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<ModalidadeEntity, ModalidadeListQuery, ModalidadeListQueryResult>(
      this.appTypeormConnection,
      ModalidadeEntity,
      { ...config, paginateConfig: modalidadePaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(
    accessContext: unknown,
    dto: ModalidadeFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<ModalidadeEntity, ModalidadeFindOneQuery, ModalidadeFindOneQueryResult>(
      this.appTypeormConnection,
      ModalidadeEntity,
      config,
      dto,
      selection,
    );
  }

  findByIdSimple(accessContext: unknown, id: string, selection?: string[] | boolean | null) {
    return this.findById(accessContext, { id } as ModalidadeFindOneQuery, selection);
  }

  create(data: Record<string, any>) {
    return typeormCreate(this.appTypeormConnection, ModalidadeEntity, data);
  }

  update(id: string | number, data: Record<string, any>) {
    return typeormUpdate(this.appTypeormConnection, ModalidadeEntity, id, data);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, ModalidadeEntity, config.alias, id);
  }
}
