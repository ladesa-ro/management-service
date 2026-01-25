import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { paginateConfig } from "@/infrastructure/fixtures";
import type {
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
} from "@/v2/server/modules/horario-gerado/http/dto";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { IHorarioGeradoRepositoryPort } from "@/v2/core/horario-gerado/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { HorarioGeradoEntity } from "../typeorm/entities";

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

  protected getPaginateConfig(): IPaginationConfig<HorarioGeradoEntity> {
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
