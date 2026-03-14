import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommand,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommandHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/commands/grade-horario-oferta-formacao-intervalo-de-tempo-delete.command.handler.interface";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
} from "../../ports";

@Injectable()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommandHandlerImpl
  implements IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommandHandler
{
  constructor(
    @Inject(GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT)
    private readonly repository: IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission(
      "grade_horario_oferta_formacao_intervalo_de_tempo:delete",
      { dto },
      dto.id,
    );

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("GradeHorarioOfertaFormacaoIntervaloDeTempo", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
