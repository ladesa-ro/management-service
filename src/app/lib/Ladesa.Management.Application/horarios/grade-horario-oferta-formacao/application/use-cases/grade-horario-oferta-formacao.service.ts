import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import type { GradeHorarioOfertaFormacao } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao";
import type {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoListOutputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao/application/dtos";
import {
  IGradeHorarioOfertaFormacaoRepository,
  type IGradeHorarioOfertaFormacaoUseCasePort,
} from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao/application/ports";

@Injectable()
export class GradeHorarioOfertaFormacaoService
  extends BaseCrudService<
    GradeHorarioOfertaFormacao,
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
    @Inject(IGradeHorarioOfertaFormacaoRepository)
    protected readonly repository: IGradeHorarioOfertaFormacaoRepository,
  ) {
    super();
  }

  protected async buildCreateData(
    _ac: AccessContext,
    dto: GradeHorarioOfertaFormacaoCreateInputDto,
  ): Promise<Partial<PersistInput<GradeHorarioOfertaFormacao>>> {
    return {
      campusId: dto.campus.id,
      ofertaFormacaoId: dto.ofertaFormacao.id,
    };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto & GradeHorarioOfertaFormacaoUpdateInputDto,
    _current: GradeHorarioOfertaFormacaoFindOneOutputDto,
  ): Promise<Partial<PersistInput<GradeHorarioOfertaFormacao>>> {
    const result: Partial<PersistInput<GradeHorarioOfertaFormacao>> = {};

    if (dto.campus !== undefined) {
      result.campusId = dto.campus ? dto.campus.id : undefined;
    }

    if (dto.ofertaFormacao !== undefined) {
      result.ofertaFormacaoId = dto.ofertaFormacao ? dto.ofertaFormacao.id : undefined;
    }

    return result;
  }
}
