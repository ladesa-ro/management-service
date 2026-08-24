import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { CalendarioAgendamentoVisibilidadeService } from "@/modules/calendario/agendamento/application/authorization/calendario-agendamento-visibilidade.service";
import type { CalendarioAgendamentoFindOneQueryResult } from "@/modules/calendario/agendamento/domain/queries/calendario-agendamento-find-one.query.result";
import type { CalendarioAgendamentoExportarIcsQuery } from "../../domain/queries/calendario-agendamento-exportar-ics.query";
import { ICalendarioAgendamentoExportarIcsQueryHandler } from "../../domain/queries/calendario-agendamento-exportar-ics.query.handler.interface";
import type { CalendarioAgendamentoExportarIcsQueryResult } from "../../domain/queries/calendario-agendamento-exportar-ics.query.result";
import { IConsultaOcorrenciasPorDataQueryHandler } from "../../domain/queries/consulta-ocorrencias-por-data.query.handler.interface";

const PRODID = "-//Ladesa RO//Management Service//PT";
const LIMITE_OCTETOS_LINHA = 75;

@DeclareImplementation()
export class CalendarioAgendamentoExportarIcsQueryHandlerImpl
  implements ICalendarioAgendamentoExportarIcsQueryHandler
{
  constructor(
    @DeclareDependency(IConsultaOcorrenciasPorDataQueryHandler)
    private readonly consultaOcorrenciasHandler: IConsultaOcorrenciasPorDataQueryHandler,
    @DeclareDependency(CalendarioAgendamentoVisibilidadeService)
    private readonly visibilidadeService: CalendarioAgendamentoVisibilidadeService,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: CalendarioAgendamentoExportarIcsQuery,
  ): Promise<CalendarioAgendamentoExportarIcsQueryResult> {
    const ocorrencias = await this.consultaOcorrenciasHandler.execute(accessContext, {
      dateStart: query.dateStart,
      dateEnd: query.dateEnd,
      campus: query.campus,
      turma: query.turma,
      professor: query.professor,
      tipo: query.tipo,
    });

    const visiveis = await this.visibilidadeService.aplicarVisibilidadeMuitos(
      accessContext,
      ocorrencias,
    );

    return this.montarCalendario(visiveis);
  }

  private montarCalendario(ocorrencias: CalendarioAgendamentoFindOneQueryResult[]): string {
    const linhas = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:${PRODID}`,
      "CALSCALE:GREGORIAN",
      ...ocorrencias.flatMap((ocorrencia) => this.montarEvento(ocorrencia)),
      "END:VCALENDAR",
    ];

    return linhas.map((linha) => this.dobrarLinha(linha)).join("\r\n") + "\r\n";
  }

  private montarEvento(ocorrencia: CalendarioAgendamentoFindOneQueryResult): string[] {
    const dataBase = ocorrencia.dataInicio.slice(0, 10).replace(/-/g, "");
    const dtstart = `${dataBase}T${ocorrencia.horarioInicio.replace(/:/g, "")}`;
    const dtend = `${dataBase}T${ocorrencia.horarioFim.replace(/:/g, "")}`;

    const linhas = [
      "BEGIN:VEVENT",
      `UID:${ocorrencia.id}-${dtstart}@ladesa`,
      `DTSTAMP:${this.formatarDataHoraUtc(new Date())}`,
      `DTSTART:${dtstart}`,
      `DTEND:${dtend}`,
      `SUMMARY:${this.escaparTexto(this.resolverSummary(ocorrencia))}`,
    ];

    const local = this.resolverLocation(ocorrencia);
    if (local !== null) {
      linhas.push(`LOCATION:${this.escaparTexto(local)}`);
    }

    const descricao = this.resolverDescription(ocorrencia);
    if (descricao !== null) {
      linhas.push(`DESCRIPTION:${this.escaparTexto(descricao)}`);
    }

    linhas.push("END:VEVENT");

    return linhas;
  }

  private resolverSummary(ocorrencia: CalendarioAgendamentoFindOneQueryResult): string {
    if (ocorrencia.detalhesOcultos) {
      return "Ocupado";
    }

    return ocorrencia.nome?.trim() || "Agendamento";
  }

  private resolverLocation(ocorrencia: CalendarioAgendamentoFindOneQueryResult): string | null {
    if (ocorrencia.ambientes.length === 0) {
      return null;
    }

    return ocorrencia.ambientes.map((ambiente) => ambiente.nome).join(", ");
  }

  private resolverDescription(ocorrencia: CalendarioAgendamentoFindOneQueryResult): string | null {
    if (ocorrencia.detalhesOcultos) {
      return null;
    }

    return ocorrencia.motivo?.trim() || null;
  }

  private formatarDataHoraUtc(data: Date): string {
    return `${data.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
  }

  private escaparTexto(valor: string): string {
    return valor
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\r?\n/g, "\\n");
  }

  private dobrarLinha(linha: string): string {
    if (linha.length <= LIMITE_OCTETOS_LINHA) {
      return linha;
    }

    let resultado = linha.slice(0, LIMITE_OCTETOS_LINHA);
    let resto = linha.slice(LIMITE_OCTETOS_LINHA);

    while (resto.length > 0) {
      resultado += `\r\n ${resto.slice(0, LIMITE_OCTETOS_LINHA - 1)}`;
      resto = resto.slice(LIMITE_OCTETOS_LINHA - 1);
    }

    return resultado;
  }
}
