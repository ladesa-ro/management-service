import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/Ladesa.Management.Application/@shared";
import {
  IProfessorIndisponibilidadeRepository,
  type IProfessorIndisponibilidadeUseCasePort,
} from "@/Ladesa.Management.Application/ensino/professor-indisponibilidade/application/ports";
import { type ProfessorIndisponibilidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeFindOneInputDto";
import { type ProfessorIndisponibilidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeFindOneOutputDto";
import { type ProfessorIndisponibilidadeListInputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeListInputDto";
import { type ProfessorIndisponibilidadeListOutputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeListOutputDto";

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
