import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DatabaseContextService } from "@/modules/@database-context";
import {
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
  IHorarioGeradoAulaRepositoryPort,
} from "@/modules/sisgha/horario-gerado-aula";
import type { HorarioGeradoAulaEntity } from "./horario-gerado-aula.entity";

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
  protected readonly alias = "horario_gerado_aula";
  protected readonly authzAction = "horario_gerado_aula:find";
  protected readonly outputDtoName = "HorarioGeradoAulaFindOneOutputDto";

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
