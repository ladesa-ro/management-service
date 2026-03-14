import { Inject, Injectable } from "@nestjs/common";
import {
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoListQuery,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoListQueryHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/queries/grade-horario-oferta-formacao-intervalo-de-tempo-list.query.handler.interface";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto } from "../../dtos";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
} from "../../ports";

@Injectable()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListQueryHandlerImpl
  implements IGradeHorarioOfertaFormacaoIntervaloDeTempoListQueryHandler
{
  constructor(
    @Inject(GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT)
    private readonly repository: IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IGradeHorarioOfertaFormacaoIntervaloDeTempoListQuery): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
