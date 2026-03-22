import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IDisciplinaFindOneQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { DisciplinaFindOneQuery, DisciplinaFindOneQueryResult } from "../../domain/queries";
import { IDisciplinaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DisciplinaFindOneQueryHandlerImpl implements IDisciplinaFindOneQueryHandler {
  constructor(
    @DeclareDependency(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneQuery,
  ): Promise<DisciplinaFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
