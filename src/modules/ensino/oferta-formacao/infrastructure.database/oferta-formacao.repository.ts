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
  OfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneQueryResult,
  OfertaFormacaoListQuery,
  OfertaFormacaoListQueryResult,
} from "@/modules/ensino/oferta-formacao";
import type { IOfertaFormacaoRepository } from "@/modules/ensino/oferta-formacao/domain/repositories";
import { OfertaFormacaoEntity } from "./typeorm/oferta-formacao.typeorm.entity";

const config = {
  alias: "oferta_formacao",
  outputDtoName: "OfertaFormacaoFindOneQueryResult",
  hasSoftDelete: true,
} as const;

const ofertaFormacaoPaginateConfig: ITypeOrmPaginationConfig<OfertaFormacaoEntity> = {
  ...paginateConfig,
  select: ["id", "nome", "slug", "dateCreated"],
  relations: {
    modalidade: true,
  },
  sortableColumns: ["nome", "slug", "dateCreated"],
  searchableColumns: ["id", "nome", "slug"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["dateCreated", "ASC"],
  ],
  filterableColumns: {
    "modalidade.id": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class OfertaFormacaoTypeOrmRepositoryAdapter implements IOfertaFormacaoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: IAccessContext | null,
    dto: OfertaFormacaoListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<
      OfertaFormacaoEntity,
      OfertaFormacaoListQuery,
      OfertaFormacaoListQueryResult
    >(
      this.appTypeormConnection,
      OfertaFormacaoEntity,
      { ...config, paginateConfig: ofertaFormacaoPaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(
    accessContext: IAccessContext | null,
    dto: OfertaFormacaoFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<
      OfertaFormacaoEntity,
      OfertaFormacaoFindOneQuery,
      OfertaFormacaoFindOneQueryResult
    >(this.appTypeormConnection, OfertaFormacaoEntity, config, dto, selection);
  }

  findByIdSimple(
    accessContext: IAccessContext | null,
    id: string,
    selection?: string[] | boolean | null,
  ) {
    return this.findById(accessContext, { id } as OfertaFormacaoFindOneQuery, selection);
  }

  create(data: Record<string, any>) {
    return typeormCreate(this.appTypeormConnection, OfertaFormacaoEntity, data);
  }

  update(id: string | number, data: Record<string, any>) {
    return typeormUpdate(this.appTypeormConnection, OfertaFormacaoEntity, id, data);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, OfertaFormacaoEntity, config.alias, id);
  }
}
