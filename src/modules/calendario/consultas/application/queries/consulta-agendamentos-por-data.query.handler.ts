import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { CalendarioAgendamentoFindOneQueryResult } from "@/modules/calendario/agendamento/domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "@/modules/calendario/agendamento/domain/repositories";
import type { ConsultaAgendamentosPorDataQuery } from "../../domain/queries/consulta-agendamentos-por-data.query";
import { IConsultaAgendamentosPorDataQueryHandler } from "../../domain/queries/consulta-agendamentos-por-data.query.handler.interface";

@DeclareImplementation()
export class ConsultaAgendamentosPorDataQueryHandlerImpl
  implements IConsultaAgendamentosPorDataQueryHandler
{
  constructor(
    @DeclareDependency(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    query: ConsultaAgendamentosPorDataQuery,
  ): Promise<CalendarioAgendamentoFindOneQueryResult[]> {
    return this.repository.findByDateRange(query);
  }
}
