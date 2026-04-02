import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormFindById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  CidadeFindOneQuery,
  CidadeFindOneQueryResult,
  CidadeListQuery,
  CidadeListQueryResult,
  ICidadeRepository,
} from "@/modules/localidades/cidade";
import { cidadePaginationSpec } from "@/modules/localidades/cidade/domain/queries";
import { CidadeEntity, CidadeTypeormMapper } from "./typeorm";

const config = {
  alias: "cidade",
  hasSoftDelete: false,
} as const;

const cidadeRelations = {
  estado: true,
};

const cidadePaginateConfig = buildTypeOrmPaginateConfig<CidadeEntity>(
  cidadePaginationSpec,
  cidadeRelations,
);

@Impl()
export class CidadeTypeOrmRepositoryAdapter implements ICidadeRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  getFindAllQueryResult(accessContext: IAccessContext | null, dto: CidadeListQuery | null = null) {
    return typeormFindAll<CidadeEntity, CidadeListQuery, CidadeListQueryResult>(
      this.appTypeormConnection,
      CidadeEntity,
      { ...config, paginateConfig: cidadePaginateConfig },
      this.paginationAdapter,
      dto,
      CidadeTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: CidadeFindOneQuery) {
    return typeormFindById<CidadeEntity, CidadeFindOneQuery, CidadeFindOneQueryResult>(
      this.appTypeormConnection,
      CidadeEntity,
      { ...config, paginateConfig: cidadePaginateConfig },
      dto,
      CidadeTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.getFindOneQueryResult(accessContext, { id: Number(id) } as CidadeFindOneQuery);
  }
}
