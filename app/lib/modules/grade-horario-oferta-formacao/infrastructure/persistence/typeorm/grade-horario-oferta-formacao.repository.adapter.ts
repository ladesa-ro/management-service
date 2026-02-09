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
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoListOutputDto,
} from "@/modules/grade-horario-oferta-formacao";
import type { IGradeHorarioOfertaFormacaoRepositoryPort } from "@/modules/grade-horario-oferta-formacao/application/ports";
import type { GradeHorarioOfertaFormacaoEntity } from "./grade-horario-oferta-formacao.entity";

@Injectable()
export class GradeHorarioOfertaFormacaoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    GradeHorarioOfertaFormacaoEntity,
    GradeHorarioOfertaFormacaoListInputDto,
    GradeHorarioOfertaFormacaoListOutputDto,
    GradeHorarioOfertaFormacaoFindOneInputDto,
    GradeHorarioOfertaFormacaoFindOneOutputDto
  >
  implements IGradeHorarioOfertaFormacaoRepositoryPort
{
  protected readonly alias = "grade_horario_oferta_formacao";
  protected readonly authzAction = "grade_horario_oferta_formacao:find";
  protected readonly outputDtoName = "GradeHorarioOfertaFormacaoFindOneOutputDto";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.gradeHorarioOfertaFormacaoRepository;
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<GradeHorarioOfertaFormacaoEntity> {
    return {
      ...paginateConfig,
      select: ["id", "dateCreated"],
      relations: {
        campus: true,
        ofertaFormacao: {
          modalidade: true,
        },
      },
      sortableColumns: ["dateCreated"],
      searchableColumns: ["id"],
      defaultSortBy: [["dateCreated", "ASC"]],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
        "ofertaFormacao.id": [FilterOperator.EQ],
        "ofertaFormacao.modalidade.id": [FilterOperator.EQ],
      },
    };
  }
}
