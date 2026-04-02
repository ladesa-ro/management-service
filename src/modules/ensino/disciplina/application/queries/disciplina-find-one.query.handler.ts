import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IDisciplinaFindOneQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import type { DisciplinaFindOneQuery, DisciplinaFindOneQueryResult } from "../../domain/queries";
import { IDisciplinaRepository } from "../../domain/repositories";

@Impl()
export class DisciplinaFindOneQueryHandlerImpl implements IDisciplinaFindOneQueryHandler {
  constructor(
    @Dep(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DisciplinaFindOneQuery,
  ): Promise<DisciplinaFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
