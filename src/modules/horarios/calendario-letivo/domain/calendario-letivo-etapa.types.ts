export interface ICalendarioLetivoEtapa {
  id: string;
  dataInicio: string;
  dataTermino: string;
  ofertaFormacaoPeriodoEtapa: { id: string; nome?: string };
  calendarioLetivo: { id: string };
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
}
