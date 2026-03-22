import type { EstagioStatus, IHorarioEstagio } from "../estagio";

export class HorarioEstagioUpdateCommand {
  diaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
}

export class EstagioUpdateCommand {
  idEmpresaFk?: string;
  idEstagiarioFk?: string;
  cargaHoraria?: number;
  dataInicio?: string;
  dataFim?: string | null;
  status?: EstagioStatus;
  horariosEstagio?: IHorarioEstagio[];
}
