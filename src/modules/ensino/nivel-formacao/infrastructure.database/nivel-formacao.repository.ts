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
  INivelFormacaoRepository,
  NivelFormacaoFindOneQuery,
  NivelFormacaoFindOneQueryResult,
  NivelFormacaoListQuery,
  NivelFormacaoListQueryResult,
} from "@/modules/ensino/nivel-formacao";
import { NivelFormacaoEntity } from "./typeorm/nivel-formacao.typeorm.entity";

const config = {
  alias: "nivel_formacao",
  outputDtoName: "NivelFormacaoFindOneQueryResult",
  hasSoftDelete: true,
} as const;

const nivelFormacaoPaginateConfig: ITypeOrmPaginationConfig<NivelFormacaoEntity> = {
  ...paginateConfig,
  select: ["id", "slug", "dateCreated"],
  sortableColumns: ["slug", "dateCreated"],
  searchableColumns: ["id", "slug"],
  defaultSortBy: [
    ["slug", "ASC"],
    ["dateCreated", "ASC"],
  ],
  filterableColumns: {},
};

@DeclareImplementation()
export class NivelFormacaoTypeOrmRepositoryAdapter implements INivelFormacaoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: IAccessContext | null,
    dto: NivelFormacaoListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<
      NivelFormacaoEntity,
      NivelFormacaoListQuery,
      NivelFormacaoListQueryResult
    >(
      this.appTypeormConnection,
      NivelFormacaoEntity,
      { ...config, paginateConfig: nivelFormacaoPaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(
    accessContext: IAccessContext | null,
    dto: NivelFormacaoFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<
      NivelFormacaoEntity,
      NivelFormacaoFindOneQuery,
      NivelFormacaoFindOneQueryResult
    >(this.appTypeormConnection, NivelFormacaoEntity, config, dto, selection);
  }

  findByIdSimple(
    accessContext: IAccessContext | null,
    id: string,
    selection?: string[] | boolean | null,
  ) {
    return this.findById(accessContext, { id } as NivelFormacaoFindOneQuery, selection);
  }

  create(data: Record<string, any>) {
    return typeormCreate(this.appTypeormConnection, NivelFormacaoEntity, data);
  }

  update(id: string | number, data: Record<string, any>) {
    return typeormUpdate(this.appTypeormConnection, NivelFormacaoEntity, id, data);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, NivelFormacaoEntity, config.alias, id);
  }
}
