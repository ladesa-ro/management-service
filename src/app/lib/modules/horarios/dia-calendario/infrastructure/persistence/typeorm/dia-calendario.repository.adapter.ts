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
  DiaCalendarioFindOneInputDto as DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto as DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto as DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto as DiaCalendarioListOutputDto,
} from "@/modules/horarios/dia-calendario";
import type { IDiaCalendarioRepositoryPort } from "@/modules/horarios/dia-calendario/application/ports";
import type { DiaCalendarioEntity } from "./dia-calendario.entity";
import { createDiaCalendarioRepository } from "./dia-calendario.repository";

@Injectable()
export class DiaCalendarioTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DiaCalendarioEntity,
    DiaCalendarioListInputDto,
    DiaCalendarioListOutputDto,
    DiaCalendarioFindOneInputDto,
    DiaCalendarioFindOneOutputDto
  >
  implements IDiaCalendarioRepositoryPort
{
  protected readonly alias = "dia_calendario";
  protected readonly authzAction = "dia_calendario:find";
  protected readonly outputDtoName = "DiaCalendarioFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createDiaCalendarioRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<DiaCalendarioEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "data",
        "diaLetivo",
        "feriado",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
        "diaPresencial",
        "tipo",
        "extraCurricular",
      ],
      sortableColumns: [
        "data",
        "diaLetivo",
        "feriado",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: ["id", "data", "diaLetivo", "feriado", "calendario.nome"],
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
