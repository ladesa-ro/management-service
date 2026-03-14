import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IGradeHorarioOfertaFormacaoDeleteCommand,
  IGradeHorarioOfertaFormacaoDeleteCommandHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao/domain/commands/grade-horario-oferta-formacao-delete.command.handler.interface";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoRepositoryPort,
} from "../../ports";

@Injectable()
export class GradeHorarioOfertaFormacaoDeleteCommandHandlerImpl
  implements IGradeHorarioOfertaFormacaoDeleteCommandHandler
{
  constructor(
    @Inject(GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT)
    private readonly repository: IGradeHorarioOfertaFormacaoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IGradeHorarioOfertaFormacaoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission(
      "grade_horario_oferta_formacao:delete",
      { dto },
      dto.id,
    );

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("GradeHorarioOfertaFormacao", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
