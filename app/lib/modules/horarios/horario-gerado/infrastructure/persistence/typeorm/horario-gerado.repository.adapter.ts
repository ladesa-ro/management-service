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
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
  IHorarioGeradoRepositoryPort,
} from "@/modules/horarios/horario-gerado";
import type { HorarioGeradoEntity } from "./horario-gerado.entity";
import { createHorarioGeradoRepository } from "./horario-gerado.repository";

@Injectable()
export class HorarioGeradoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    HorarioGeradoEntity,
    HorarioGeradoListInputDto,
    HorarioGeradoListOutputDto,
    HorarioGeradoFindOneInputDto,
    HorarioGeradoFindOneOutputDto
  >
  implements IHorarioGeradoRepositoryPort
{
  protected readonly alias = "horario_gerado";
  protected readonly authzAction = "horario_gerado:find";
  protected readonly outputDtoName = "HorarioGeradoFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createHorarioGeradoRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<HorarioGeradoEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "status",
        "tipo",
        "dataGeracao",
        "vigenciaInicio",
        "vigenciaFim",
        "calendario",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      sortableColumns: [
        "status",
        "tipo",
        "dataGeracao",
        "vigenciaInicio",
        "vigenciaFim",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: [
        "id",
        "status",
        "tipo",
        "dataGeracao",
        "vigenciaInicio",
        "vigenciaFim",
        "calendario",
      ],
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
