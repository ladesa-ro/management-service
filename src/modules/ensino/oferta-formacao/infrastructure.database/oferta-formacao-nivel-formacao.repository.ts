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
  IOfertaFormacaoNivelFormacaoRepository,
  OfertaFormacaoNivelFormacaoFindOneQuery,
  OfertaFormacaoNivelFormacaoFindOneQueryResult,
  OfertaFormacaoNivelFormacaoListQuery,
  OfertaFormacaoNivelFormacaoListQueryResult,
} from "@/modules/ensino/oferta-formacao";
import type { OfertaFormacaoNivelFormacaoEntity } from "./typeorm/oferta-formacao-nivel-formacao.typeorm.entity";
import { createOfertaFormacaoNivelFormacaoRepository } from "./typeorm/oferta-formacao-nivel-formacao.typeorm.repository";

@DeclareImplementation()
export class OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    OfertaFormacaoNivelFormacaoEntity,
    OfertaFormacaoNivelFormacaoListQuery,
    OfertaFormacaoNivelFormacaoListQueryResult,
    OfertaFormacaoNivelFormacaoFindOneQuery,
    OfertaFormacaoNivelFormacaoFindOneQueryResult
  >
  implements IOfertaFormacaoNivelFormacaoRepository
{
  protected readonly alias = "oferta_formacao_nivel_formacao";
  protected readonly outputDtoName = "OfertaFormacaoNivelFormacaoFindOneQueryResult";

  constructor(
    @DeclareDependency(IAppTypeormConnection)
    protected readonly appTypeormConnection: IAppTypeormConnection,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createOfertaFormacaoNivelFormacaoRepository(this.appTypeormConnection);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<OfertaFormacaoNivelFormacaoEntity> {
    return {
      ...paginateConfig,
      select: ["id", "dateCreated"],
      relations: {
        nivelFormacao: true,
        ofertaFormacao: {
          modalidade: true,
        },
      },
      sortableColumns: ["dateCreated"],
      searchableColumns: ["id"],
      defaultSortBy: [["dateCreated", "ASC"]],
      filterableColumns: {
        "nivelFormacao.id": [FilterOperator.EQ],
        "ofertaFormacao.id": [FilterOperator.EQ],
        "ofertaFormacao.modalidade.id": [FilterOperator.EQ],
      },
    };
  }
}
