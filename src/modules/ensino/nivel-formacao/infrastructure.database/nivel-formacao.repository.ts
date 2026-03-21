import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  BaseTypeOrmRepositoryAdapter,
  IAppTypeormConnection,
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
import type { NivelFormacaoEntity } from "./typeorm/nivel-formacao.typeorm.entity";
import { createNivelFormacaoRepository } from "./typeorm/nivel-formacao.typeorm.repository";

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
    @DeclareDependency(IAppTypeormConnection)
    protected readonly appTypeormConnection: IAppTypeormConnection,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createNivelFormacaoRepository(this.appTypeormConnection);
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
