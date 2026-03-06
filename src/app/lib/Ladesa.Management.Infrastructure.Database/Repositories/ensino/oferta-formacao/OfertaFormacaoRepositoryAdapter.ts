import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import type {
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao";
import type { IOfertaFormacaoRepositoryPort } from "@/Ladesa.Management.Application/ensino/oferta-formacao/application/ports";
import type { OfertaFormacaoEntity } from "@/Ladesa.Management.Application/ensino/oferta-formacao/infrastructure/persistence/typeorm/oferta-formacao.entity";
import { createOfertaFormacaoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ensino/oferta-formacao/oferta-formacao.repository";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
