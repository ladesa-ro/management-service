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
  IOfertaFormacaoNivelFormacaoRepositoryPort,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoListOutputDto,
} from "@/modules/ensino/oferta-formacao-nivel-formacao";
import type { OfertaFormacaoNivelFormacaoEntity } from "./oferta-formacao-nivel-formacao.entity";
import { createOfertaFormacaoNivelFormacaoRepository } from "./oferta-formacao-nivel-formacao.repository";

@Injectable()
export class OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    OfertaFormacaoNivelFormacaoEntity,
    OfertaFormacaoNivelFormacaoListInputDto,
    OfertaFormacaoNivelFormacaoListOutputDto,
    OfertaFormacaoNivelFormacaoFindOneInputDto,
    OfertaFormacaoNivelFormacaoFindOneOutputDto
  >
  implements IOfertaFormacaoNivelFormacaoRepositoryPort
{
  protected readonly alias = "oferta_formacao_nivel_formacao";
  protected readonly authzAction = "oferta_formacao_nivel_formacao:find";
  protected readonly outputDtoName = "OfertaFormacaoNivelFormacaoFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createOfertaFormacaoNivelFormacaoRepository(this.dataSource);
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
