export interface IHorarioAulaConfiguracao {
  id: string;
  dataInicio: Date;
  dataFim: Date | null;
  ativo: boolean;
  campus: { id: string };
}
