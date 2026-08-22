export class CalendarioAgendamentoImportarIcsRejeitado {
  index!: number;
  uid!: string | null;
  motivo!: string;
}

/**
 * Resumo de uma importação de .ics: importação em massa que falha
 * silenciosamente é pior que não ter — por isso cada VEVENT rejeitado vem com
 * a posição no arquivo e o motivo, em vez de só um contador.
 */
export class CalendarioAgendamentoImportarIcsResult {
  criados!: number;
  puladosPorUidDuplicado!: number;
  rejeitados!: CalendarioAgendamentoImportarIcsRejeitado[];
  idsCriados!: string[];
}
