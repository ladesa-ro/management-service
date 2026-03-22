export interface ITurmaHorarioAula {
  id: string;
  horarioAula: { id: string; inicio?: string; fim?: string };
  turma: { id: string };
}
