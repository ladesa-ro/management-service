import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IDisciplinaFindOneQuery,
  IDisciplinaFindOneQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import type { DisciplinaFindOneQueryResult } from "../../domain/queries";
import { IDisciplinaRepository } from "../../domain/repositories";
@DeclareImplementation()
export class DisciplinaFindOneQueryHandlerImpl implements IDisciplinaFindOneQueryHandler {
  constructor(
    @DeclareDependency(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDisciplinaFindOneQuery): Promise<DisciplinaFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
