import type { EstagioStatus } from "../estagio";

export class HorarioEstagioQueryResult {
  id!: string;
  diaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
}

export class EstagioFindOneQueryResult {
  id!: string;
  idEmpresaFk!: string;
  idEstagiarioFk!: string | null;
  cargaHoraria!: number;
  dataInicio!: string | null;
  dataFim!: string | null;
  status!: EstagioStatus;
  horariosEstagio!: HorarioEstagioQueryResult[];
  ativo!: boolean;
  dateCreated!: string;
  dateUpdated!: string;
}
