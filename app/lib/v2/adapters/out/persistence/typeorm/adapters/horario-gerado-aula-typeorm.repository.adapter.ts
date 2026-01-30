import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type {
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
} from "@/v2/server/modules/horario-gerado-aula/http/dto";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { IHorarioGeradoAulaRepositoryPort } from "@/v2/core/horario-gerado-aula/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { HorarioGeradoAulaEntity } from "../typeorm/entities";

@Injectable()
export class HorarioGeradoAulaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    HorarioGeradoAulaEntity,
    HorarioGeradoAulaListInputDto,
    HorarioGeradoAulaListOutputDto,
    HorarioGeradoAulaFindOneInputDto,
    HorarioGeradoAulaFindOneOutputDto
  >
  implements IHorarioGeradoAulaRepositoryPort
{
  protected readonly alias = "horario_gerado_dia";
  protected readonly authzAction = "horario_gerado_aula:find";
  protected readonly outputDtoName = "HorarioGeradoAulaFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.horarioGeradoAulaRepository;
  }

  protected getPaginateConfig(): IPaginationConfig<HorarioGeradoAulaEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "diaSemanaIso",
        "horarioGerado",
        "diarioProfessor",
        "intervaloDeTempo",
        "diarioProfessor.id",
        "diarioProfessor.situacao",
        "intervaloDeTempo.id",
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",
        "horarioGerado.id",
        "horarioGerado.status",
        "horarioGerado.tipo",
        "horarioGerado.dataGeracao",
        "horarioGerado.vigenciaInicio",
        "horarioGerado.vigenciaFim",
      ],
      sortableColumns: [
        "diaSemanaIso",
        "horarioGerado",
        "diarioProfessor",
        "intervaloDeTempo",
        "diarioProfessor.id",
        "intervaloDeTempo.id",
        "horarioGerado.id",
      ],
      searchableColumns: [
        "id",
        "diaSemanaIso",
        "horarioGerado",
        "diarioProfessor",
        "intervaloDeTempo",
      ],
      relations: {
        diarioProfessor: true,
        intervaloDeTempo: true,
        horarioGerado: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "horarioGerado.id": [FilterOperator.EQ],
      },
    };
  }
}
