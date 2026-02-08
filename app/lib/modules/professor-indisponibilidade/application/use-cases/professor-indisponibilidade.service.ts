import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/modules/@shared";
import type {
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

@Injectable()
export class ProfessorIndisponibilidadeService
  extends BaseReadOnlyService<
    ProfessorIndisponibilidadeListInput,
    ProfessorIndisponibilidadeListOutput,
    ProfessorIndisponibilidadeFindOneInput,
    ProfessorIndisponibilidadeFindOneOutput
  >
  implements IProfessorIndisponibilidadeUseCasePort
{
  protected readonly resourceName = "ProfessorIndisponibilidade";

  constructor(
    @Inject(PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT)
    protected readonly repository: IProfessorIndisponibilidadeRepositoryPort,
  ) {
    super();
  }
}
