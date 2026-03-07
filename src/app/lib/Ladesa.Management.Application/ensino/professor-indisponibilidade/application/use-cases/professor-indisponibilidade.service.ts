import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/Ladesa.Management.Application/@shared";
import type {
  ProfessorIndisponibilidadeFindOneInputDto,
  ProfessorIndisponibilidadeFindOneOutputDto,
  ProfessorIndisponibilidadeListInputDto,
  ProfessorIndisponibilidadeListOutputDto,
} from "@/Ladesa.Management.Application/ensino/professor-indisponibilidade/application/dtos";
import {
  IProfessorIndisponibilidadeRepository,
  type IProfessorIndisponibilidadeUseCasePort,
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
    @Inject(IProfessorIndisponibilidadeRepository)
    protected readonly repository: IProfessorIndisponibilidadeRepository,
  ) {
    super();
  }
}
