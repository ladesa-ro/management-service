import { Inject, Injectable } from "@nestjs/common";
import {
  type IDisciplinaListQuery,
  IDisciplinaListQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-list.query.handler.interface";
import {
  DISCIPLINA_REPOSITORY_PORT,
  type IDisciplinaRepositoryPort,
} from "../../../domain/repositories";
import type { DisciplinaListOutputDto } from "../../dtos";

@Injectable()
export class DisciplinaListQueryHandlerImpl implements IDisciplinaListQueryHandler {
  constructor(
    @Inject(DISCIPLINA_REPOSITORY_PORT)
    private readonly repository: IDisciplinaRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDisciplinaListQuery): Promise<DisciplinaListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
