import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import type {
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
  IHorarioGeradoAulaRepositoryPort,
} from "@/Ladesa.Management.Application/horarios/horario-gerado-aula";
import type { HorarioGeradoAulaEntity } from "@/Ladesa.Management.Application/horarios/horario-gerado-aula/infrastructure/persistence/typeorm/horario-gerado-aula.entity";
import { createHorarioGeradoAulaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/horarios/horario-gerado-aula/horario-gerado-aula.repository";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createHorarioGeradoAulaRepository(this.dataSource);
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
