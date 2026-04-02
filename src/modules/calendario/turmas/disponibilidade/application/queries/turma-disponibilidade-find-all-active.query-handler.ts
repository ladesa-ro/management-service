import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { TurmaDisponibilidadeFindAllActiveQuery } from "../../domain/queries/turma-disponibilidade-find-all-active.query";
import { ITurmaDisponibilidadeFindAllActiveQueryHandler } from "../../domain/queries/turma-disponibilidade-find-all-active.query-handler.interface";
import { ITurmaDisponibilidadeRepository } from "../../domain/repositories";
import type { TurmaDisponibilidadeConfiguracao } from "../../domain/turma-disponibilidade";

@Impl()
export class TurmaDisponibilidadeFindAllActiveQueryHandlerImpl
  implements ITurmaDisponibilidadeFindAllActiveQueryHandler
{
  constructor(
    @Dep(ITurmaDisponibilidadeRepository)
    private readonly repository: ITurmaDisponibilidadeRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    query: TurmaDisponibilidadeFindAllActiveQuery,
  ): Promise<TurmaDisponibilidadeConfiguracao[]> {
    return this.repository.findAllActiveByTurmaId(query.turmaId);
  }
}
