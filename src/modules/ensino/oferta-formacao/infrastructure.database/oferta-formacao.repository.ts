import { FilterOperator } from "nestjs-paginate";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  BaseTypeOrmRepositoryAdapter,
  IAppTypeormConnection,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  OfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneQueryResult,
  OfertaFormacaoListQuery,
  OfertaFormacaoListQueryResult,
} from "@/modules/ensino/oferta-formacao";
import type { IOfertaFormacaoRepository } from "@/modules/ensino/oferta-formacao/domain/repositories";
import type { OfertaFormacaoEntity } from "./typeorm/oferta-formacao.typeorm.entity";
import { createOfertaFormacaoRepository } from "./typeorm/oferta-formacao.typeorm.repository";

@DeclareImplementation()
export class OfertaFormacaoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    OfertaFormacaoEntity,
    OfertaFormacaoListQuery,
    OfertaFormacaoListQueryResult,
    OfertaFormacaoFindOneQuery,
    OfertaFormacaoFindOneQueryResult
  >
  implements IOfertaFormacaoRepository
{
  protected readonly alias = "oferta_formacao";
  protected readonly outputDtoName = "OfertaFormacaoFindOneQueryResult";

  constructor(
    @DeclareDependency(IAppTypeormConnection)
    protected readonly appTypeormConnection: IAppTypeormConnection,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createOfertaFormacaoRepository(this.appTypeormConnection);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<OfertaFormacaoEntity> {
    return {
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
  }
}
