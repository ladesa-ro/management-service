import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IGradeHorarioOfertaFormacaoUpdateCommand,
  IGradeHorarioOfertaFormacaoUpdateCommandHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao/domain/commands/grade-horario-oferta-formacao-update.command.handler.interface";
import type { IGradeHorarioOfertaFormacao } from "@/modules/horarios/grade-horario-oferta-formacao/domain/grade-horario-oferta-formacao.types";
import type { GradeHorarioOfertaFormacaoFindOneOutputDto } from "../../dtos";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoRepositoryPort,
} from "../../ports";

@Injectable()
export class GradeHorarioOfertaFormacaoUpdateCommandHandlerImpl
  implements IGradeHorarioOfertaFormacaoUpdateCommandHandler
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
  }: IGradeHorarioOfertaFormacaoUpdateCommand): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("GradeHorarioOfertaFormacao", dto.id);
    }

    await this.authorizationService.ensurePermission(
      "grade_horario_oferta_formacao:update",
      { dto },
      dto.id,
    );

    const updateData: Partial<PersistInput<IGradeHorarioOfertaFormacao>> = {};
    if (dto.campus !== undefined) {
      updateData.campus = dto.campus ? { id: dto.campus.id } : null;
    }
    if (dto.ofertaFormacao !== undefined) {
      updateData.ofertaFormacao = dto.ofertaFormacao ? { id: dto.ofertaFormacao.id } : null;
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("GradeHorarioOfertaFormacao", dto.id);
    }

    return result;
  }
}
