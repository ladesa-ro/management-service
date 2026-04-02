import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { TurmaDisponibilidadeFindByWeekQuery } from "../../domain/queries/turma-disponibilidade-find-by-week.query";
import { ITurmaDisponibilidadeFindByWeekQueryHandler } from "../../domain/queries/turma-disponibilidade-find-by-week.query-handler.interface";
import { ITurmaDisponibilidadeRepository } from "../../domain/repositories";
import type { TurmaDisponibilidadeConfiguracao } from "../../domain/turma-disponibilidade";

@DeclareImplementation()
export class TurmaDisponibilidadeFindByWeekQueryHandlerImpl
  implements ITurmaDisponibilidadeFindByWeekQueryHandler
{
  constructor(
    @DeclareDependency(ITurmaDisponibilidadeRepository)
    private readonly repository: ITurmaDisponibilidadeRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    query: TurmaDisponibilidadeFindByWeekQuery,
  ): Promise<TurmaDisponibilidadeConfiguracao | null> {
    const domingoSemana = this.normalizeToDomingo(query.semana);
    return this.repository.findByWeek(query.turmaId, domingoSemana);
  }

  private normalizeToDomingo(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getUTCDay();
    date.setUTCDate(date.getUTCDate() - day);
    return date.toISOString().split("T")[0];
  }
}
