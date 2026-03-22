import type { ObjectUuidRef } from "@/domain/abstractions";
import type { EstagioStatus, IHorarioEstagio } from "../estagio";
import { EstagioFields } from "../estagio.fields";

export const EstagioCreateCommandFields = {
  ...EstagioFields,
};

export class HorarioEstagioInputCommand {
  diaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
}

export class EstagioCreateCommand {
  empresa!: ObjectUuidRef;
  estagiario?: ObjectUuidRef;
  cargaHoraria!: number;
  dataInicio?: string;
  dataFim?: string | null;
  status?: EstagioStatus;
  horariosEstagio?: IHorarioEstagio[];
}
