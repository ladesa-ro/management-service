/**
 * EstagioImportBulkCommand — Comando para importação em massa de estágios via CSV.
 *
 * Estrutura de um item de importação:
 * {
 *   matriculaEstagiario: string
 *   nomeEstagiario: string
 *   emailPessoal: string
 *   emailAcademico: string
 *   curso: string
 *   campus: string
 *   empresaId: string (UUID)
 *   nomeSupervisor: string
 *   emailSupervisor: string
 *   telefoneSupervisor: string
 *   cargaHoraria: number
 *   dataInicio: string (ISO 8601)
 *   dataFim: string (ISO 8601)
 * }
 */
export interface EstagioImportBulkItem {
  matriculaEstagiario: string;
  nomeEstagiario: string;
  emailPessoal: string;
  emailAcademico?: string;
  curso: string;
  campus: string;
  empresaId: string;
  nomeSupervisor: string;
  emailSupervisor: string;
  telefoneSupervisor: string;
  cargaHoraria: number;
  dataInicio: string;
  dataFim: string;
}

export class EstagioImportBulkCommand {
  constructor(readonly items: EstagioImportBulkItem[]) {}
}
