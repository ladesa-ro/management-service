import { SharedFields } from "@/domain/abstractions";
import type { EstagioStatus } from "../estagio";
import { EstagioFields } from "../estagio.fields";

export const EstagioFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...EstagioFields,
  dateCreated: SharedFields.dateCreated,
  dateUpdated: SharedFields.dateUpdated,
};

export class HorarioEstagioQueryResult {
  id!: string;
  diaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
}

export class EstagioFindOneQueryResult {
  id!: string;
  empresa!: { id: string };
  estagiario!: { id: string } | null;
  cargaHoraria!: number;
  dataInicio!: string | null;
  dataFim!: string | null;
  status!: EstagioStatus;
  horariosEstagio!: HorarioEstagioQueryResult[];
  ativo!: boolean;
  dateCreated!: string;
  dateUpdated!: string;
}
