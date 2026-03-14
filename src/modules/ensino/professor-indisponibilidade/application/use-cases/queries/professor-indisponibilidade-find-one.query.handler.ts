import { Inject, Injectable } from "@nestjs/common";
import {
  type IProfessorIndisponibilidadeFindOneQuery,
  IProfessorIndisponibilidadeFindOneQueryHandler,
} from "@/modules/ensino/professor-indisponibilidade/domain/queries/professor-indisponibilidade-find-one.query.handler.interface";
import type { ProfessorIndisponibilidadeFindOneOutputDto } from "../../dtos";
import {
  type IProfessorIndisponibilidadeRepositoryPort,
  PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class ProfessorIndisponibilidadeFindOneQueryHandlerImpl
  implements IProfessorIndisponibilidadeFindOneQueryHandler
{
  constructor(
    @Inject(PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT)
    private readonly repository: IProfessorIndisponibilidadeRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IProfessorIndisponibilidadeFindOneQuery): Promise<ProfessorIndisponibilidadeFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto);
  }
}
