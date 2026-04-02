import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IDisciplinaListQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-list.query.handler.interface";
import type { DisciplinaListQuery, DisciplinaListQueryResult } from "../../domain/queries";
import { IDisciplinaRepository } from "../../domain/repositories";

@Impl()
export class DisciplinaListQueryHandlerImpl implements IDisciplinaListQueryHandler {
  constructor(
    @Dep(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DisciplinaListQuery | null,
  ): Promise<DisciplinaListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
