export class CalendarioAgendamentoImportarIcsRejeitado {
  index!: number;
  uid!: string | null;
  motivo!: string;
}

export class CalendarioAgendamentoImportarIcsResult {
  criados!: number;
  puladosPorUidDuplicado!: number;
  rejeitados!: CalendarioAgendamentoImportarIcsRejeitado[];
  idsCriados!: string[];
}
