export interface ICalendarioLetivoEtapa {
  id: string;
  dataInicio: Date;
  dataTermino: Date;
  ofertaFormacaoPeriodoEtapa: { id: string; nome?: string };
  calendarioLetivo: { id: string };
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}
