import type { ObjectUuidRef } from "@/domain/abstractions";
import type { EstagioStatus, IHorarioEstagio } from "../estagio";
import { EstagioFields } from "../estagio.fields";

export const EstagioUpdateCommandFields = {
  ...EstagioFields,
};

export class HorarioEstagioUpdateCommand {
  diaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
}

export class EstagioUpdateCommand {
  empresa?: ObjectUuidRef;
  estagiario?: ObjectUuidRef;
  cargaHoraria?: number;
  dataInicio?: string;
  dataFim?: string | null;
  status?: EstagioStatus;
  horariosEstagio?: IHorarioEstagio[];
}
