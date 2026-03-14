import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IGradeHorarioOfertaFormacaoCreateCommand,
  IGradeHorarioOfertaFormacaoCreateCommandHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao/domain/commands/grade-horario-oferta-formacao-create.command.handler.interface";
import type { GradeHorarioOfertaFormacaoFindOneOutputDto } from "../../dtos";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoRepositoryPort,
} from "../../ports";

@Injectable()
export class GradeHorarioOfertaFormacaoCreateCommandHandlerImpl
  implements IGradeHorarioOfertaFormacaoCreateCommandHandler
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
  }: IGradeHorarioOfertaFormacaoCreateCommand): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    await this.authorizationService.ensurePermission("grade_horario_oferta_formacao:create", {
      dto,
    });

    const { id } = await this.repository.createFromDomain({
      campus: { id: dto.campus.id },
      ofertaFormacao: { id: dto.ofertaFormacao.id },
    });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("GradeHorarioOfertaFormacao", id);
    }

    return result;
  }
}
