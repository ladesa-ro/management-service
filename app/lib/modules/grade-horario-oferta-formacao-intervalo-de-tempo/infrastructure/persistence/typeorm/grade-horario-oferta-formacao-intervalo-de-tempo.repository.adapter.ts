import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { SelectQueryBuilder } from "typeorm";
import { DatabaseContextService } from "@/modules/@database-context";
import type { ITypeOrmPaginationConfig } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput,
} from "@/modules/grade-horario-oferta-formacao-intervalo-de-tempo";
import type { IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort } from "@/modules/grade-horario-oferta-formacao-intervalo-de-tempo/application/ports/out";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "./grade-horario-oferta-formacao-intervalo-de-tempo.entity";

/**
 * Adapter TypeORM que implementa o port de repositório de GradeHorarioOfertaFormacaoIntervaloDeTempo.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@Injectable()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    GradeHorarioOfertaFormacaoIntervaloDeTempoEntity,
    GradeHorarioOfertaFormacaoIntervaloDeTempoListInput,
    GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput,
    GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
    GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput
  >
  implements IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort
{
  protected readonly alias = "gh_of_it";
  protected readonly authzAction = "grade_horario_oferta_formacao_intervalo_de_tempo:find";
  protected readonly outputDtoName = "GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository;
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
