import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
} from "@/modules/ensino/oferta-formacao";
import type { IOfertaFormacaoRepositoryPort } from "@/modules/ensino/oferta-formacao/application/ports";
import type { OfertaFormacaoEntity } from "./oferta-formacao.entity";
import { createOfertaFormacaoRepository } from "./oferta-formacao.repository";

@Injectable()
export class OfertaFormacaoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    OfertaFormacaoEntity,
    OfertaFormacaoListInputDto,
    OfertaFormacaoListOutputDto,
    OfertaFormacaoFindOneInputDto,
    OfertaFormacaoFindOneOutputDto
  >
  implements IOfertaFormacaoRepositoryPort
{
  protected readonly alias = "oferta_formacao";
  protected readonly authzAction = "oferta_formacao:find";
  protected readonly outputDtoName = "OfertaFormacaoFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
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
