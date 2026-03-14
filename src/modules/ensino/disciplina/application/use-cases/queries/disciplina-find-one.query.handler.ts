import { Inject, Injectable } from "@nestjs/common";
import {
  type IDisciplinaFindOneQuery,
  IDisciplinaFindOneQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import {
  DISCIPLINA_REPOSITORY_PORT,
  type IDisciplinaRepositoryPort,
} from "../../../domain/repositories";
import type { DisciplinaFindOneOutputDto } from "../../dtos";

@Injectable()
export class DisciplinaFindOneQueryHandlerImpl implements IDisciplinaFindOneQueryHandler {
  constructor(
    @Inject(DISCIPLINA_REPOSITORY_PORT)
    private readonly repository: IDisciplinaRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDisciplinaFindOneQuery): Promise<DisciplinaFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
