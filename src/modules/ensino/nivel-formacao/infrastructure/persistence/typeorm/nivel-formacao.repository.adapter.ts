import { DataSource } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  INivelFormacaoRepository,
  NivelFormacaoFindOneQuery,
  NivelFormacaoFindOneQueryResult,
  NivelFormacaoListQuery,
  NivelFormacaoListQueryResult,
} from "@/modules/ensino/nivel-formacao";
import type { NivelFormacaoEntity } from "./nivel-formacao.entity";
import { createNivelFormacaoRepository } from "./nivel-formacao.repository";

@DeclareImplementation()
export class NivelFormacaoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    NivelFormacaoEntity,
    NivelFormacaoListQuery,
    NivelFormacaoListQueryResult,
    NivelFormacaoFindOneQuery,
    NivelFormacaoFindOneQueryResult
  >
  implements INivelFormacaoRepository
{
  protected readonly alias = "nivel_formacao";
  protected readonly outputDtoName = "NivelFormacaoFindOneQueryResult";

  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createNivelFormacaoRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<NivelFormacaoEntity> {
    return {
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
  }
}
