import { Inject, Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  ProfessorIndisponibilidadeFindOneInput,
  ProfessorIndisponibilidadeFindOneOutput,
  ProfessorIndisponibilidadeListInput,
  ProfessorIndisponibilidadeListOutput,
} from "@/modules/professor-indisponibilidade/application/dtos";
import {
  type IProfessorIndisponibilidadeRepositoryPort,
  type IProfessorIndisponibilidadeUseCasePort,
  PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT,
} from "@/modules/professor-indisponibilidade/application/ports";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class ProfessorIndisponibilidadeService implements IProfessorIndisponibilidadeUseCasePort {
  constructor(
    @Inject(PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT)
    private readonly professorIndisponibilidadeRepository: IProfessorIndisponibilidadeRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeListInput | null = null,
  ): Promise<ProfessorIndisponibilidadeListOutput> {
    return this.professorIndisponibilidadeRepository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeFindOneInput,
  ): Promise<ProfessorIndisponibilidadeFindOneOutput | null> {
    return this.professorIndisponibilidadeRepository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeFindOneInput,
  ): Promise<ProfessorIndisponibilidadeFindOneOutput> {
    const professorIndisponibilidade = await this.professorIndisponibilidadeRepository.findById(
      accessContext,
      dto,
    );

    if (!professorIndisponibilidade) {
      throw new ResourceNotFoundError("ProfessorIndisponibilidade", dto.id);
    }

    return professorIndisponibilidade;
  }
}
