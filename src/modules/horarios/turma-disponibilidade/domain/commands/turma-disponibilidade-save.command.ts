export class TurmaDisponibilidadeSaveCommand {
  turmaId!: string;
  configs!: Array<{
    dataInicio: string;
    dataFim: string | null;
    horarios: Array<{
      diaSemana: number;
      intervalos: Array<{ inicio: string; fim: string }>;
    }>;
  }>;
  aplicarFuturas?: boolean;
}
