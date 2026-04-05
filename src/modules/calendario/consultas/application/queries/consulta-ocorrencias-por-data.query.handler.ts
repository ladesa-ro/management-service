import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { CalendarioAgendamentoFindOneQueryResult } from "@/modules/calendario/agendamento/domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "@/modules/calendario/agendamento/domain/repositories";
import type { ConsultaOcorrenciasPorDataQuery } from "../../domain/queries/consulta-ocorrencias-por-data.query";
import { IConsultaOcorrenciasPorDataQueryHandler } from "../../domain/queries/consulta-ocorrencias-por-data.query.handler.interface";

@DeclareImplementation()
export class ConsultaOcorrenciasPorDataQueryHandlerImpl
  implements IConsultaOcorrenciasPorDataQueryHandler
{
  constructor(
    @DeclareDependency(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    query: ConsultaOcorrenciasPorDataQuery,
  ): Promise<CalendarioAgendamentoFindOneQueryResult[]> {
    return this.repository.findByDateRange(query);
  }
}
