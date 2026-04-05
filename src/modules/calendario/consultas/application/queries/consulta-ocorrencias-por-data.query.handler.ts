import { rrulestr } from "rrule";
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
    const agendamentos = await this.repository.findByDateRange(query);

    return this.expandOccurrences(agendamentos, query.dateStart, query.dateEnd);
  }

  // Ensure date-only strings get explicit midnight UTC to avoid timezone issues
  private normalizeDate(dateStr: string): Date {
    if (dateStr.includes("T")) return new Date(dateStr);
    return new Date(dateStr + "T00:00:00Z");
  }

  private expandOccurrences(
    agendamentos: CalendarioAgendamentoFindOneQueryResult[],
    rangeStart: string,
    rangeEnd: string,
  ): CalendarioAgendamentoFindOneQueryResult[] {
    const results: CalendarioAgendamentoFindOneQueryResult[] = [];

    const rangeStartDate = this.normalizeDate(rangeStart);
    const rangeEndDate = this.normalizeDate(rangeEnd);

    for (const agendamento of agendamentos) {
      if (!agendamento.repeticao) {
        results.push(agendamento);
        continue;
      }

      const expanded = this.expandSingleAgendamento(agendamento, rangeStartDate, rangeEndDate);
      results.push(...expanded);
    }

    return results;
  }

  private expandSingleAgendamento(
    agendamento: CalendarioAgendamentoFindOneQueryResult,
    rangeStart: Date,
    rangeEnd: Date,
  ): CalendarioAgendamentoFindOneQueryResult[] {
    const occurrences: CalendarioAgendamentoFindOneQueryResult[] = [];

    const MAX_OCCURRENCES_PER_AGENDAMENTO = 1000;

    const originalStart = this.normalizeDate(agendamento.dataInicio);
    const durationMs =
      agendamento.dataFim !== null
        ? this.normalizeDate(agendamento.dataFim).getTime() - originalStart.getTime()
        : 0;

    try {
      const rule = rrulestr(agendamento.repeticao!, { dtstart: originalStart });
      const dates = rule.between(rangeStart, rangeEnd, true);

      if (dates.length > MAX_OCCURRENCES_PER_AGENDAMENTO) {
        console.warn(
          `[ConsultaOcorrenciasPorData] RRULE expansion truncated: ${dates.length} occurrences found for agendamento ${agendamento.id}, limited to ${MAX_OCCURRENCES_PER_AGENDAMENTO}`,
        );
      }

      const limitedDates = dates.slice(0, MAX_OCCURRENCES_PER_AGENDAMENTO);

      for (const occurrenceDate of limitedDates) {
        // Shallow copy is safe here: query results are read-only DTOs with only primitive/array fields
        const occurrence = Object.assign(
          Object.create(Object.getPrototypeOf(agendamento)),
          agendamento,
        ) as CalendarioAgendamentoFindOneQueryResult;

        occurrence.dataInicio = occurrenceDate.toISOString();

        if (agendamento.dataFim !== null) {
          occurrence.dataFim = new Date(occurrenceDate.getTime() + durationMs).toISOString();
        }

        occurrences.push(occurrence);
      }
    } catch (error) {
      // Se a RRULE for inválida, retorna o agendamento original sem expansão
      console.warn(
        `[ConsultaOcorrenciasPorData] Falha ao parsear RRULE do agendamento ${agendamento.id}:`,
        error,
      );
      occurrences.push(agendamento);
    }

    return occurrences;
  }
}
