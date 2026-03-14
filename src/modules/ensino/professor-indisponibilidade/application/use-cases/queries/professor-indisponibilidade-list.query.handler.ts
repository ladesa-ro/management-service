import { Inject, Injectable } from "@nestjs/common";
import {
  type IProfessorIndisponibilidadeListQuery,
  IProfessorIndisponibilidadeListQueryHandler,
} from "@/modules/ensino/professor-indisponibilidade/domain/queries/professor-indisponibilidade-list.query.handler.interface";
import type { ProfessorIndisponibilidadeListOutputDto } from "../../dtos";
import {
  type IProfessorIndisponibilidadeRepositoryPort,
  PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class ProfessorIndisponibilidadeListQueryHandlerImpl
  implements IProfessorIndisponibilidadeListQueryHandler
{
  constructor(
    @Inject(PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT)
    private readonly repository: IProfessorIndisponibilidadeRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IProfessorIndisponibilidadeListQuery): Promise<ProfessorIndisponibilidadeListOutputDto> {
    return this.repository.findAll(accessContext, dto);
  }
}
