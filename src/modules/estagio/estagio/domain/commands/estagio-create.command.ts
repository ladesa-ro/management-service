import type { ObjectUuidRef } from "@/domain/abstractions";
import type { EstagioStatus, IHorarioEstagio } from "../estagio";
import { EstagioFields } from "../estagio.fields";

export const EstagioCreateCommandFields = {
  ...EstagioFields,
};

export class HorarioEstagioInputCommand {
  diaSemana!: number;
  horaInicio!: string | null;
  horaFim!: string | null;
}

export class EstagioCreateCommand {
  campus?: ObjectUuidRef;
  empresa!: ObjectUuidRef;
  CursoReferencia?: ObjectUuidRef | null;
  estagiario?: ObjectUuidRef | null;
  usuarioOrientador?: ObjectUuidRef;
  cargaHoraria!: number;
  dataInicio?: string | null;
  dataFim?: string | null;
  status?: EstagioStatus;
  nomeSupervisor?: string | null;
  emailSupervisor?: string | null;
  telefoneSupervisor?: string | null;
  aditivo?: boolean;
  tipoAditivo?: string | null;
  horariosEstagio?: IHorarioEstagio[] | null;
}
