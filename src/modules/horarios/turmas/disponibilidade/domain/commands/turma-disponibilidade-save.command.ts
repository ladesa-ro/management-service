export class TurmaDisponibilidadeSaveCommand {
  turmaId!: string;
  configs!: Array<{
    dataInicio: string;
    dataFim: string | null;
    identificadorExternoGradeHoraria?: string | null;
    horarios: Array<{
      diaSemana: number;
      intervalos: Array<{ inicio: string; fim: string }>;
    }>;
  }>;
}
