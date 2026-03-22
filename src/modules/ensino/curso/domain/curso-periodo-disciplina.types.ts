export interface ICursoPeriodoDisciplina {
  id: string;
  curso: { id: string };
  numeroPeriodo: number;
  disciplina: { id: string; nome?: string };
  cargaHoraria: number | null;
}
