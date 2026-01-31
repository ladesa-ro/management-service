import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type {
  HorarioGeradoFindOneInput,
  HorarioGeradoFindOneOutput,
  HorarioGeradoListInput,
  HorarioGeradoListOutput,
  IHorarioGeradoRepositoryPort,
} from "@/core/horario-gerado";
import type { ITypeOrmPaginationConfig } from "../types";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { HorarioGeradoEntity } from "../typeorm/entities";

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
