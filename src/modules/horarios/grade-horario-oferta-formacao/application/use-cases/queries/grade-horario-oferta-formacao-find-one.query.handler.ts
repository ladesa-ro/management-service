import { Inject, Injectable } from "@nestjs/common";
import {
  type IGradeHorarioOfertaFormacaoFindOneQuery,
  IGradeHorarioOfertaFormacaoFindOneQueryHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao/domain/queries/grade-horario-oferta-formacao-find-one.query.handler.interface";
import type { GradeHorarioOfertaFormacaoFindOneOutputDto } from "../../dtos";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoRepositoryPort,
} from "../../ports";

@Injectable()
export class GradeHorarioOfertaFormacaoFindOneQueryHandlerImpl
  implements IGradeHorarioOfertaFormacaoFindOneQueryHandler
{
  constructor(
    @Inject(GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT)
    private readonly repository: IGradeHorarioOfertaFormacaoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IGradeHorarioOfertaFormacaoFindOneQuery): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
