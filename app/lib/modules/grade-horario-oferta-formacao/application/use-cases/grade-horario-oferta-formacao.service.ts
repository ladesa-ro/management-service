import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import type {
  GradeHorarioOfertaFormacaoCreateInput,
  GradeHorarioOfertaFormacaoFindOneInput,
  GradeHorarioOfertaFormacaoFindOneOutput,
  GradeHorarioOfertaFormacaoListInput,
  GradeHorarioOfertaFormacaoListOutput,
  GradeHorarioOfertaFormacaoUpdateInput,
} from "@/modules/grade-horario-oferta-formacao/application/dtos";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoRepositoryPort,
  type IGradeHorarioOfertaFormacaoUseCasePort,
} from "@/modules/grade-horario-oferta-formacao/application/ports";
import type { GradeHorarioOfertaFormacaoEntity } from "@/modules/grade-horario-oferta-formacao/infrastructure/persistence/typeorm";

@Injectable()
export class GradeHorarioOfertaFormacaoService
  extends BaseCrudService<
    GradeHorarioOfertaFormacaoEntity,
    GradeHorarioOfertaFormacaoListInput,
    GradeHorarioOfertaFormacaoListOutput,
    GradeHorarioOfertaFormacaoFindOneInput,
    GradeHorarioOfertaFormacaoFindOneOutput,
    GradeHorarioOfertaFormacaoCreateInput,
    GradeHorarioOfertaFormacaoUpdateInput
  >
  implements IGradeHorarioOfertaFormacaoUseCasePort
{
  protected readonly resourceName = "GradeHorarioOfertaFormacao";
  protected readonly createAction = "grade_horario_oferta_formacao:create";
  protected readonly updateAction = "grade_horario_oferta_formacao:update";
  protected readonly deleteAction = "grade_horario_oferta_formacao:delete";
  protected readonly createFields = [] as const;
  protected readonly updateFields = [] as const;

  constructor(
    @Inject(GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT)
    protected readonly repository: IGradeHorarioOfertaFormacaoRepositoryPort,
  ) {
    super();
  }

  protected override async beforeCreate(
    _accessContext: AccessContext,
    entity: GradeHorarioOfertaFormacaoEntity,
    dto: GradeHorarioOfertaFormacaoCreateInput,
  ): Promise<void> {
    this.repository.merge(entity, {
      campus: { id: dto.campus.id },
      ofertaFormacao: { id: dto.ofertaFormacao.id },
    } as any);
  }

  protected override async beforeUpdate(
    _accessContext: AccessContext,
    entity: GradeHorarioOfertaFormacaoEntity,
    dto: GradeHorarioOfertaFormacaoFindOneInput & GradeHorarioOfertaFormacaoUpdateInput,
  ): Promise<void> {
    if (dto.campus !== undefined) {
      this.repository.merge(entity, {
        campus: dto.campus ? { id: dto.campus.id } : null,
      } as any);
    }

    if (dto.ofertaFormacao !== undefined) {
      this.repository.merge(entity, {
        ofertaFormacao: dto.ofertaFormacao ? { id: dto.ofertaFormacao.id } : null,
      } as any);
    }
  }
}
