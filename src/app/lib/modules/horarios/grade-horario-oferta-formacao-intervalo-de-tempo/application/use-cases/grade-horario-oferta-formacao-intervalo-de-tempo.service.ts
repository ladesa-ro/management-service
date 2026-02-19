import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { GradeHorarioOfertaFormacaoService } from "@/modules/horarios/grade-horario-oferta-formacao";
import type { IGradeHorarioOfertaFormacaoIntervaloDeTempo } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo";
import { IntervaloDeTempoService } from "@/modules/horarios/intervalo-de-tempo";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
} from "../dtos";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
} from "../ports/out";

@Injectable()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoService extends BaseCrudService<
  IGradeHorarioOfertaFormacaoIntervaloDeTempo,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto
> {
  protected readonly resourceName = "GradeHorarioOfertaFormacaoIntervaloDeTempo";
  protected readonly createAction = "grade_horario_oferta_formacao_intervalo_de_tempo:create";
  protected readonly updateAction = "grade_horario_oferta_formacao_intervalo_de_tempo:update";
  protected readonly deleteAction = "grade_horario_oferta_formacao_intervalo_de_tempo:delete";

  constructor(
    @Inject(GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT)
    protected readonly repository: IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
    private readonly gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  ): Promise<Partial<PersistInput<IGradeHorarioOfertaFormacaoIntervaloDeTempo>>> {
    const result: Record<string, any> = {};

    if (dto.gradeHorarioOfertaFormacao) {
      const gradeHorarioOfertaFormacao =
        await this.gradeHorarioOfertaFormacaoService.findByIdStrict(accessContext, {
          id: dto.gradeHorarioOfertaFormacao.id,
        });
      result.gradeHorarioOfertaFormacao = { id: gradeHorarioOfertaFormacao.id };
    }

    if (dto.intervaloDeTempo) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      result.intervaloDeTempo = { id: intervaloDeTempo.id };
    }

    return result as IGradeHorarioOfertaFormacaoIntervaloDeTempo;
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto &
      GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
    _current: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  ): Promise<Partial<PersistInput<IGradeHorarioOfertaFormacaoIntervaloDeTempo>>> {
    const result: Partial<PersistInput<IGradeHorarioOfertaFormacaoIntervaloDeTempo>> = {};

    if (has(dto, "gradeHorarioOfertaFormacao") && dto.gradeHorarioOfertaFormacao !== undefined) {
      if (dto.gradeHorarioOfertaFormacao) {
        const gradeHorarioOfertaFormacao =
          await this.gradeHorarioOfertaFormacaoService.findByIdStrict(accessContext, {
            id: dto.gradeHorarioOfertaFormacao.id,
          });
        result.gradeHorarioOfertaFormacao = { id: gradeHorarioOfertaFormacao.id };
      } else {
        result.gradeHorarioOfertaFormacao = null;
      }
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      if (dto.intervaloDeTempo) {
        const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
          accessContext,
          dto.intervaloDeTempo,
        );
        result.intervaloDeTempo = { id: intervaloDeTempo.id };
      } else {
        result.intervaloDeTempo = null;
      }
    }

    return result;
  }
}
