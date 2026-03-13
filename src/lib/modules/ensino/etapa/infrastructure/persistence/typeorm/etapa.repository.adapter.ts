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
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
  IEtapaRepositoryPort,
} from "@/modules/ensino/etapa";
import type { EtapaEntity } from "./etapa.entity";
import { createEtapaRepository } from "./etapa.repository";

@Injectable()
export class EtapaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    EtapaEntity,
    EtapaListInputDto,
    EtapaListOutputDto,
    EtapaFindOneInputDto,
    EtapaFindOneOutputDto
  >
  implements IEtapaRepositoryPort
{
  protected readonly alias = "etapa";
  protected readonly authzAction = "etapa:find";
  protected readonly outputDtoName = "EtapaFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createEtapaRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<EtapaEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "numero",
        "dataInicio",
        "dataTermino",
        "cor",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      sortableColumns: [
        "numero",
        "dataInicio",
        "dataTermino",
        "cor",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: ["id", "numero", "dataInicio", "dataTermino", "cor"],
      relations: {
        calendario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "calendario.id": [FilterOperator.EQ],
        "calendario.nome": [FilterOperator.EQ],
        "calendario.ano": [FilterOperator.EQ],
      },
    };
  }
}
