import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/Ladesa.Management.Application/@shared";
import type {
  ProfessorIndisponibilidadeFindOneInputDto,
  ProfessorIndisponibilidadeFindOneOutputDto,
  ProfessorIndisponibilidadeListInputDto,
  ProfessorIndisponibilidadeListOutputDto,
} from "@/Ladesa.Management.Application/ensino/professor-indisponibilidade/application/dtos";
import {
  type IProfessorIndisponibilidadeRepositoryPort,
  type IProfessorIndisponibilidadeUseCasePort,
  PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT,
} from "@/Ladesa.Management.Application/ensino/professor-indisponibilidade/application/ports";

@Injectable()
export class ProfessorIndisponibilidadeService
  extends BaseReadOnlyService<
    ProfessorIndisponibilidadeListInputDto,
    ProfessorIndisponibilidadeListOutputDto,
    ProfessorIndisponibilidadeFindOneInputDto,
    ProfessorIndisponibilidadeFindOneOutputDto
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
