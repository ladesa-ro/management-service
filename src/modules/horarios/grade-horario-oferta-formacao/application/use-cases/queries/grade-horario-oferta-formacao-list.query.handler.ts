import { Inject, Injectable } from "@nestjs/common";
import {
  type IGradeHorarioOfertaFormacaoListQuery,
  IGradeHorarioOfertaFormacaoListQueryHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao/domain/queries/grade-horario-oferta-formacao-list.query.handler.interface";
import type { GradeHorarioOfertaFormacaoListOutputDto } from "../../dtos";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoRepositoryPort,
} from "../../ports";

@Injectable()
export class GradeHorarioOfertaFormacaoListQueryHandlerImpl
  implements IGradeHorarioOfertaFormacaoListQueryHandler
{
  constructor(
    @Inject(GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT)
    private readonly repository: IGradeHorarioOfertaFormacaoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IGradeHorarioOfertaFormacaoListQuery): Promise<GradeHorarioOfertaFormacaoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
