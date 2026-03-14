import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IDisciplinaListQuery,
  IDisciplinaListQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-list.query.handler.interface";
import type { DisciplinaListQueryResult } from "../../domain/queries";
import { IDisciplinaRepository } from "../../domain/repositories";
@DeclareImplementation()
export class DisciplinaListQueryHandlerImpl implements IDisciplinaListQueryHandler {
  constructor(
    @DeclareDependency(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDisciplinaListQuery): Promise<DisciplinaListQueryResult> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
