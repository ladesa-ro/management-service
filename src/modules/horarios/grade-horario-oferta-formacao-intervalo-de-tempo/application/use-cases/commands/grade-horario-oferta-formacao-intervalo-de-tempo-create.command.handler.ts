import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { GradeHorarioOfertaFormacaoService } from "@/modules/horarios/grade-horario-oferta-formacao";
import {
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommand,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommandHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/commands/grade-horario-oferta-formacao-intervalo-de-tempo-create.command.handler.interface";
import type { IGradeHorarioOfertaFormacaoIntervaloDeTempo } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/grade-horario-oferta-formacao-intervalo-de-tempo.types";
import { IntervaloDeTempoService } from "@/modules/horarios/intervalo-de-tempo";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto } from "../../dtos";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
} from "../../ports";

@Injectable()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommandHandlerImpl
  implements IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommandHandler
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
  }: IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommand): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {
    await this.authorizationService.ensurePermission(
      "grade_horario_oferta_formacao_intervalo_de_tempo:create",
      { dto },
    );

    const createData: Partial<PersistInput<IGradeHorarioOfertaFormacaoIntervaloDeTempo>> = {};
    if (dto.gradeHorarioOfertaFormacao) {
      const gradeHorarioOfertaFormacao =
        await this.gradeHorarioOfertaFormacaoService.findByIdStrict(accessContext, {
          id: dto.gradeHorarioOfertaFormacao.id,
        });
      createData.gradeHorarioOfertaFormacao = { id: gradeHorarioOfertaFormacao.id };
    }
    if (dto.intervaloDeTempo) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      createData.intervaloDeTempo = { id: intervaloDeTempo.id };
    }
    const { id } = await this.repository.createFromDomain(createData as any);

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("GradeHorarioOfertaFormacaoIntervaloDeTempo", id);
    }

    return result;
  }
}
