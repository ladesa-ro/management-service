import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { GradeHorarioOfertaFormacaoService } from "@/modules/grade-horario-oferta-formacao";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/modules/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure/persistence/typeorm";
import { IntervaloDeTempoService } from "@/modules/intervalo-de-tempo";
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
  GradeHorarioOfertaFormacaoIntervaloDeTempoEntity,
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
  protected readonly createFields = [] as const;
  protected readonly updateFields = [] as const;

  constructor(
    @Inject(GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT)
    protected readonly repository: IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
    private readonly gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: GradeHorarioOfertaFormacaoIntervaloDeTempoEntity,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  ): Promise<void> {
    if (dto.gradeHorarioOfertaFormacao) {
      const gradeHorarioOfertaFormacao =
        await this.gradeHorarioOfertaFormacaoService.findByIdStrict(accessContext, {
          id: dto.gradeHorarioOfertaFormacao.id,
        });
      this.repository.merge(entity, {
        gradeHorarioOfertaFormacao: { id: gradeHorarioOfertaFormacao.id },
      });
    }

    if (dto.intervaloDeTempo) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      this.repository.merge(entity, { intervaloDeTempo: { id: intervaloDeTempo.id } });
    }
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: GradeHorarioOfertaFormacaoIntervaloDeTempoEntity,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto &
      GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "gradeHorarioOfertaFormacao") && dto.gradeHorarioOfertaFormacao !== undefined) {
      if (dto.gradeHorarioOfertaFormacao) {
        const gradeHorarioOfertaFormacao =
          await this.gradeHorarioOfertaFormacaoService.findByIdStrict(accessContext, {
            id: dto.gradeHorarioOfertaFormacao.id,
          });
        this.repository.merge(entity, {
          gradeHorarioOfertaFormacao: { id: gradeHorarioOfertaFormacao.id },
        });
      } else {
        this.repository.merge(entity, { gradeHorarioOfertaFormacao: null as any });
      }
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      if (dto.intervaloDeTempo) {
        const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
          accessContext,
          dto.intervaloDeTempo,
        );
        this.repository.merge(entity, { intervaloDeTempo: { id: intervaloDeTempo.id } });
      } else {
        this.repository.merge(entity, { intervaloDeTempo: null as any });
      }
    }
  }
}
