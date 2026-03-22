import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IDisciplinaListQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-list.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { DisciplinaListQuery, DisciplinaListQueryResult } from "../../domain/queries";
import { IDisciplinaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DisciplinaListQueryHandlerImpl implements IDisciplinaListQueryHandler {
  constructor(
    @DeclareDependency(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: DisciplinaListQuery | null,
  ): Promise<DisciplinaListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
