import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { GradeHorarioOfertaFormacaoService } from "@/modules/horarios/grade-horario-oferta-formacao";
import {
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommand,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommandHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/commands/grade-horario-oferta-formacao-intervalo-de-tempo-update.command.handler.interface";
import type { IGradeHorarioOfertaFormacaoIntervaloDeTempo } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/grade-horario-oferta-formacao-intervalo-de-tempo.types";
import { IntervaloDeTempoService } from "@/modules/horarios/intervalo-de-tempo";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto } from "../../dtos";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
} from "../../ports";

@Injectable()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommandHandlerImpl
  implements IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommandHandler
{
  constructor(
    @Inject(GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT)
    private readonly repository: IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
    private readonly gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommand): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("GradeHorarioOfertaFormacaoIntervaloDeTempo", dto.id);
    }

    await this.authorizationService.ensurePermission(
      "grade_horario_oferta_formacao_intervalo_de_tempo:update",
      { dto },
      dto.id,
    );

    const updateData: Partial<PersistInput<IGradeHorarioOfertaFormacaoIntervaloDeTempo>> = {};
    if (has(dto, "gradeHorarioOfertaFormacao") && dto.gradeHorarioOfertaFormacao !== undefined) {
      if (dto.gradeHorarioOfertaFormacao) {
        const gradeHorarioOfertaFormacao =
          await this.gradeHorarioOfertaFormacaoService.findByIdStrict(accessContext, {
            id: dto.gradeHorarioOfertaFormacao.id,
          });
        updateData.gradeHorarioOfertaFormacao = { id: gradeHorarioOfertaFormacao.id };
      } else {
        updateData.gradeHorarioOfertaFormacao = null;
      }
    }
    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      if (dto.intervaloDeTempo) {
        const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
          accessContext,
          dto.intervaloDeTempo,
        );
        updateData.intervaloDeTempo = { id: intervaloDeTempo.id };
      } else {
        updateData.intervaloDeTempo = null;
      }
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("GradeHorarioOfertaFormacaoIntervaloDeTempo", dto.id);
    }

    return result;
  }
}
