import { Inject, Injectable } from "@nestjs/common";
import {
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQuery,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQueryHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/queries/grade-horario-oferta-formacao-intervalo-de-tempo-find-one.query.handler.interface";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto } from "../../dtos";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
} from "../../ports";

@Injectable()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQueryHandlerImpl
  implements IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQueryHandler
{
  constructor(
    @Inject(GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT)
    private readonly repository: IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQuery): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
