export class CalendarioOcupacaoSemDetalheQueryResultItem {
  data!: string;
  horarioInicio!: string;
  horarioFim!: string;
  ambienteIds!: string[];
  professorIds!: string[];
}

export type CalendarioOcupacaoSemDetalheQueryResult = CalendarioOcupacaoSemDetalheQueryResultItem[];
