import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { SelectQueryBuilder } from "typeorm";
import { DataSource } from "typeorm";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo";
import type { IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/application/ports/out";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "./grade-horario-oferta-formacao-intervalo-de-tempo.entity";
import { createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository } from "./grade-horario-oferta-formacao-intervalo-de-tempo.repository";

/**
 * Adapter TypeORM que implementa o port de repositório de GradeHorarioOfertaFormacaoIntervaloDeTempo.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@Injectable()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    GradeHorarioOfertaFormacaoIntervaloDeTempoEntity,
    GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
    GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
    GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
    GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto
  >
  implements IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort
{
  protected readonly alias = "gh_of_it";
  protected readonly authzAction = "grade_horario_oferta_formacao_intervalo_de_tempo:find";
  protected readonly outputDtoName = "GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository(this.dataSource);
  }

  /**
   * @deprecated Usado para verificações de permissão. Será removido em fases futuras.
   */
  createQueryBuilder(
    alias: string,
  ): SelectQueryBuilder<GradeHorarioOfertaFormacaoIntervaloDeTempoEntity> {
    return this.repository.createQueryBuilder(alias);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<GradeHorarioOfertaFormacaoIntervaloDeTempoEntity> {
    return {
      ...paginateConfig,
      relations: {
        gradeHorarioOfertaFormacao: true,
        intervaloDeTempo: true,
      },
      select: ["id", "dateCreated"],
      sortableColumns: ["dateCreated"],
      searchableColumns: ["id"],
      defaultSortBy: [["dateCreated", "ASC"]],
      filterableColumns: {
        "gradeHorarioOfertaFormacao.id": [FilterOperator.EQ],
        "intervaloDeTempo.id": [FilterOperator.EQ],
      },
    };
  }
}
