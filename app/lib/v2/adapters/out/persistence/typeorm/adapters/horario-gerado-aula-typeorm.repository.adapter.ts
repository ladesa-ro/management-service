import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type {
  HorarioGeradoAulaFindOneInput,
  HorarioGeradoAulaFindOneOutput,
  HorarioGeradoAulaListInput,
  HorarioGeradoAulaListOutput,
  IHorarioGeradoAulaRepositoryPort,
} from "@/core/horario-gerado-aula";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { HorarioGeradoAulaEntity } from "../typeorm/entities";
import type { ITypeOrmPaginationConfig } from "../types";

@Injectable()
export class HorarioGeradoAulaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    HorarioGeradoAulaEntity,
    HorarioGeradoAulaListInput,
    HorarioGeradoAulaListOutput,
    HorarioGeradoAulaFindOneInput,
    HorarioGeradoAulaFindOneOutput
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

  protected getPaginateConfig(): ITypeOrmPaginationConfig<HorarioGeradoAulaEntity> {
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
