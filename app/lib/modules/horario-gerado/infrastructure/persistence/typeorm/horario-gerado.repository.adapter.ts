import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DatabaseContextService } from "@/modules/@database-context";
import type { ITypeOrmPaginationConfig } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  HorarioGeradoFindOneInput,
  HorarioGeradoFindOneOutput,
  HorarioGeradoListInput,
  HorarioGeradoListOutput,
  IHorarioGeradoRepositoryPort,
} from "@/modules/horario-gerado";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { HorarioGeradoEntity } from "./horario-gerado.entity";

@Injectable()
export class HorarioGeradoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    HorarioGeradoEntity,
    HorarioGeradoListInput,
    HorarioGeradoListOutput,
    HorarioGeradoFindOneInput,
    HorarioGeradoFindOneOutput
  >
  implements IHorarioGeradoRepositoryPort
{
  protected readonly alias = "horario_gerado";
  protected readonly authzAction = "horario_gerado:find";
  protected readonly outputDtoName = "HorarioGeradoFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.horarioGeradoRepository;
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
