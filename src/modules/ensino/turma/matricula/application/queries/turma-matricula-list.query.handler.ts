import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { TurmaMatriculaListQuery, TurmaMatriculaListQueryResult } from "../../domain/queries";
import { ITurmaMatriculaListQueryHandler } from "../../domain/queries/turma-matricula-list.query.handler.interface";
import { ITurmaMatriculaRepository } from "../../domain/repositories";

@Impl()
export class TurmaMatriculaListQueryHandlerImpl implements ITurmaMatriculaListQueryHandler {
  constructor(
    @Dep(ITurmaMatriculaRepository)
    private readonly repository: ITurmaMatriculaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: TurmaMatriculaListQuery | null,
  ): Promise<TurmaMatriculaListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
