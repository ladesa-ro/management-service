import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { GradeHorarioOfertaFormacaoService } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempo } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao-intervalo-de-tempo";
import { IntervaloDeTempoService } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo";
import { type GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto";
import { type GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto";
import { type GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto";
import { type GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto";
import { type GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto";
import { type GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto";
import { IGradeHorarioOfertaFormacaoIntervaloDeTempoRepository } from "@/Ladesa.Management.Domain/Repositories/IGradeHorarioOfertaFormacaoIntervaloDeTempoRepository";

@Injectable()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoService extends BaseCrudService<
  GradeHorarioOfertaFormacaoIntervaloDeTempo,
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
    @Inject(IGradeHorarioOfertaFormacaoIntervaloDeTempoRepository)
    protected readonly repository: IGradeHorarioOfertaFormacaoIntervaloDeTempoRepository,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
    private readonly gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  ): Promise<Partial<PersistInput<GradeHorarioOfertaFormacaoIntervaloDeTempo>>> {
    const result: Record<string, any> = {};

    if (dto.gradeHorarioOfertaFormacao) {
      const gradeHorarioOfertaFormacao =
        await this.gradeHorarioOfertaFormacaoService.findByIdStrict(accessContext, {
          id: dto.gradeHorarioOfertaFormacao.id,
        });
      result.gradeHorarioOfertaFormacaoId = gradeHorarioOfertaFormacao.id;
    }

    if (dto.intervaloDeTempo) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      result.intervaloDeTempoId = intervaloDeTempo.id;
    }

    return result as GradeHorarioOfertaFormacaoIntervaloDeTempo;
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto &
      GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
    _current: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  ): Promise<Partial<PersistInput<GradeHorarioOfertaFormacaoIntervaloDeTempo>>> {
    const result: Partial<PersistInput<GradeHorarioOfertaFormacaoIntervaloDeTempo>> = {};

    if (has(dto, "gradeHorarioOfertaFormacao") && dto.gradeHorarioOfertaFormacao !== undefined) {
      if (dto.gradeHorarioOfertaFormacao) {
        const gradeHorarioOfertaFormacao =
          await this.gradeHorarioOfertaFormacaoService.findByIdStrict(accessContext, {
            id: dto.gradeHorarioOfertaFormacao.id,
          });
        result.gradeHorarioOfertaFormacaoId = gradeHorarioOfertaFormacao.id;
      } else {
        result.gradeHorarioOfertaFormacaoId = undefined;
      }
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      if (dto.intervaloDeTempo) {
        const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
          accessContext,
          dto.intervaloDeTempo,
        );
        result.intervaloDeTempoId = intervaloDeTempo.id;
      } else {
        result.intervaloDeTempoId = undefined;
      }
    }

    return result;
  }
}
