import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import type { IGradeHorarioOfertaFormacao } from "@/modules/horarios/grade-horario-oferta-formacao";
import type {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoListOutputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "@/modules/horarios/grade-horario-oferta-formacao/application/dtos";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoRepositoryPort,
  type IGradeHorarioOfertaFormacaoUseCasePort,
} from "@/modules/horarios/grade-horario-oferta-formacao/application/ports";

@Injectable()
export class GradeHorarioOfertaFormacaoService
  extends BaseCrudService<
    IGradeHorarioOfertaFormacao,
    GradeHorarioOfertaFormacaoListInputDto,
    GradeHorarioOfertaFormacaoListOutputDto,
    GradeHorarioOfertaFormacaoFindOneInputDto,
    GradeHorarioOfertaFormacaoFindOneOutputDto,
    GradeHorarioOfertaFormacaoCreateInputDto,
    GradeHorarioOfertaFormacaoUpdateInputDto
  >
  implements IGradeHorarioOfertaFormacaoUseCasePort
{
  protected readonly resourceName = "GradeHorarioOfertaFormacao";
  protected readonly createAction = "grade_horario_oferta_formacao:create";
  protected readonly updateAction = "grade_horario_oferta_formacao:update";
  protected readonly deleteAction = "grade_horario_oferta_formacao:delete";

  constructor(
    @Inject(GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT)
    protected readonly repository: IGradeHorarioOfertaFormacaoRepositoryPort,
  ) {
    super();
  }

  protected async buildCreateData(
    _ac: AccessContext,
    dto: GradeHorarioOfertaFormacaoCreateInputDto,
  ): Promise<Partial<PersistInput<IGradeHorarioOfertaFormacao>>> {
    return {
      campus: { id: dto.campus.id },
      ofertaFormacao: { id: dto.ofertaFormacao.id },
    };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto & GradeHorarioOfertaFormacaoUpdateInputDto,
    _current: GradeHorarioOfertaFormacaoFindOneOutputDto,
  ): Promise<Partial<PersistInput<IGradeHorarioOfertaFormacao>>> {
    const result: Partial<PersistInput<IGradeHorarioOfertaFormacao>> = {};

    if (dto.campus !== undefined) {
      result.campus = dto.campus ? { id: dto.campus.id } : null;
    }

    if (dto.ofertaFormacao !== undefined) {
      result.ofertaFormacao = dto.ofertaFormacao ? { id: dto.ofertaFormacao.id } : null;
    }

    return result;
  }
}
