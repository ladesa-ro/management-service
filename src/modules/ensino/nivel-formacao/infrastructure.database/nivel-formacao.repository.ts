import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { paginateConfig } from "@/infrastructure.database/pagination/config/paginate-config";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  NivelFormacaoFindOneQuery,
  NivelFormacaoFindOneQueryResult,
  NivelFormacaoListQuery,
  NivelFormacaoListQueryResult,
} from "@/modules/ensino/nivel-formacao";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import type { INivelFormacaoRepository } from "@/modules/ensino/nivel-formacao/domain/repositories";
import { NivelFormacaoEntity, nivelFormacaoEntityDomainMapper } from "./typeorm";

const config = {
  alias: "nivel_formacao",
  hasSoftDelete: true,
} as const;

const nivelFormacaoPaginateConfig: ITypeOrmPaginationConfig<NivelFormacaoEntity> = {
  ...paginateConfig,
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

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<NivelFormacao | null> {
    const repo = this.appTypeormConnection.getRepository(NivelFormacaoEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
    });

    if (!entity) return null;

    return NivelFormacao.load(
      nivelFormacaoEntityDomainMapper.toOutputData(entity as unknown as Record<string, unknown>),
    );
  }

  async save(aggregate: NivelFormacao): Promise<void> {
    const entityData = nivelFormacaoEntityDomainMapper.toPersistenceData({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(NivelFormacaoEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as NivelFormacaoEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, NivelFormacaoEntity, config.alias, id);
  }

  // ==========================================
  // Read side
  // ==========================================

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: NivelFormacaoFindOneQuery) {
    return typeormFindById<
      NivelFormacaoEntity,
      NivelFormacaoFindOneQuery,
      NivelFormacaoFindOneQueryResult
    >(
      this.appTypeormConnection,
      NivelFormacaoEntity,
      { ...config, paginateConfig: nivelFormacaoPaginateConfig },
      dto,
    );
  }

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: NivelFormacaoListQuery | null = null,
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
    );
  }
}
