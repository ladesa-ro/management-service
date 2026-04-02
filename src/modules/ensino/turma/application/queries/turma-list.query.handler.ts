import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ITurmaListQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-list.query.handler.interface";
import type { TurmaListQuery, TurmaListQueryResult } from "../../domain/queries";
import { ITurmaRepository } from "../../domain/repositories";

@Impl()
export class TurmaListQueryHandlerImpl implements ITurmaListQueryHandler {
  constructor(
    @Dep(ITurmaRepository)
    private readonly repository: ITurmaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: TurmaListQuery | null,
  ): Promise<TurmaListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
