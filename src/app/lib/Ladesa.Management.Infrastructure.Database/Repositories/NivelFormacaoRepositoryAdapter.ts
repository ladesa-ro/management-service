import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type {
  INivelFormacaoRepositoryPort,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
} from "@/Ladesa.Management.Application/ensino/nivel-formacao";
import type { NivelFormacaoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/NivelFormacaoEntity";
import { createNivelFormacaoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/NivelFormacaoRepository";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";

@Injectable()
export class NivelFormacaoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    NivelFormacaoEntity,
    NivelFormacaoListInputDto,
    NivelFormacaoListOutputDto,
    NivelFormacaoFindOneInputDto,
    NivelFormacaoFindOneOutputDto
  >
  implements INivelFormacaoRepositoryPort
{
  protected readonly alias = "nivel_formacao";
  protected readonly authzAction = "nivel_formacao:find";
  protected readonly outputDtoName = "NivelFormacaoFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
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
