import { Inject, Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/modules/@shared";
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
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class GradeHorarioOfertaFormacaoService implements IGradeHorarioOfertaFormacaoUseCasePort {
  constructor(
    @Inject(GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT)
    private readonly gradeHorarioOfertaFormacaoRepository: IGradeHorarioOfertaFormacaoRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoListInput | null = null,
  ): Promise<GradeHorarioOfertaFormacaoListOutput> {
    return this.gradeHorarioOfertaFormacaoRepository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext | null,
    dto: GradeHorarioOfertaFormacaoFindOneInput,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutput | null> {
    return this.gradeHorarioOfertaFormacaoRepository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInput,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutput> {
    const gradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoRepository.findById(
      accessContext,
      dto,
    );

    if (!gradeHorarioOfertaFormacao) {
      throw new ResourceNotFoundError("GradeHorarioOfertaFormacao", dto.id);
    }

    return gradeHorarioOfertaFormacao;
  }

  async create(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoCreateInput,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutput> {
    return this.gradeHorarioOfertaFormacaoRepository.createOne(accessContext, dto);
  }

  async update(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInput & GradeHorarioOfertaFormacaoUpdateInput,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutput> {
    // Verify entity exists
    await this.findByIdStrict(accessContext, { id: dto.id });

    const { id, ...updateData } = dto;
    return this.gradeHorarioOfertaFormacaoRepository.update(accessContext, id, updateData);
  }

  async deleteOneById(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInput,
  ): Promise<boolean> {
    // Verify entity exists
    await this.findByIdStrict(accessContext, dto);

    return this.gradeHorarioOfertaFormacaoRepository.deleteById(accessContext, dto);
  }
}
