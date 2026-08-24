export interface ICalendarioAgendamentoLinhaDoTempoEntrada {
  id: string;
  version: number;
  autorId: string | null;
  autorNome: string | null;
  motivo: string | null;
  validFrom: string;
  validTo: string | null;
  mudancas: { campo: string; de: unknown; para: unknown }[];
}

export class CalendarioAgendamentoLinhaDoTempoQueryResult {
  identificadorExterno!: string;
  colecaoId!: string | null;
  versoes!: ICalendarioAgendamentoLinhaDoTempoEntrada[];
}
