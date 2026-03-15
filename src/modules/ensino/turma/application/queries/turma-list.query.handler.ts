import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ITurmaListQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-list.query.handler.interface";
import type { TurmaListQuery, TurmaListQueryResult } from "../../domain/queries";
import { ITurmaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class TurmaListQueryHandlerImpl implements ITurmaListQueryHandler {
  constructor(
    @DeclareDependency(ITurmaRepository)
    private readonly repository: ITurmaRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: TurmaListQuery | null,
  ): Promise<TurmaListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
