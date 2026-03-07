import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import type {
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
  IEtapaRepository,
} from "@/Ladesa.Management.Application/ensino/etapa";
import type { EtapaEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/EtapaEntity";
import { createEtapaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateEtapaRepository";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";

@Injectable()
export class EtapaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    EtapaEntity,
    EtapaListInputDto,
    EtapaListOutputDto,
    EtapaFindOneInputDto,
    EtapaFindOneOutputDto
  >
  implements IEtapaRepository
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
