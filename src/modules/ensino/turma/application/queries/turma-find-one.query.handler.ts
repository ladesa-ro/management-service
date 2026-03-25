import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import type { TurmaFindOneQuery, TurmaFindOneQueryResult } from "../../domain/queries";
import { ITurmaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class TurmaFindOneQueryHandlerImpl implements ITurmaFindOneQueryHandler {
  constructor(
    @DeclareDependency(ITurmaRepository)
    private readonly repository: ITurmaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: TurmaFindOneQuery,
  ): Promise<TurmaFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
