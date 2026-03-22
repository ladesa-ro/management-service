import type { EstagioStatus, IHorarioEstagio } from "../estagio";

export class HorarioEstagioInputCommand {
  diaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
}

export class EstagioCreateCommand {
  idEmpresaFk!: string;
  idEstagiarioFk?: string;
  cargaHoraria!: number;
  dataInicio?: string;
  dataFim?: string | null;
  status?: EstagioStatus;
  horariosEstagio?: IHorarioEstagio[];
}
