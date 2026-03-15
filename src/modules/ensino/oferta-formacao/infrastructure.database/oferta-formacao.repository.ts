import { FilterOperator } from "nestjs-paginate";
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
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createOfertaFormacaoRepository(this.dataSource);
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
