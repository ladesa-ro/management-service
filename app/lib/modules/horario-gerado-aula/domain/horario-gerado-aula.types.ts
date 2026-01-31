import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { IDiarioProfessor } from "@/modules/diario-professor/domain/diario-professor.types";
import type { IHorarioGerado } from "@/modules/horario-gerado";
import type { IIntervaloDeTempo } from "@/modules/intervalo-de-tempo/domain/intervalo-de-tempo.types";

export interface IHorarioGeradoAula {
  id: IdUuid;
  data: ScalarDateTimeString;
  diarioProfessor: IDiarioProfessor;
  horarioGerado: IHorarioGerado;
  intervaloDeTempo: IIntervaloDeTempo;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

export interface IHorarioGeradoAulaCreate {
  data: ScalarDateTimeString;
  diarioProfessor: { id: IdUuid };
  horarioGerado: { id: IdUuid };
  intervaloDeTempo: { id: IdUuid };
}

export interface IHorarioGeradoAulaUpdate {
  data?: ScalarDateTimeString;
  diarioProfessor?: { id: IdUuid };
  horarioGerado?: { id: IdUuid };
  intervaloDeTempo?: { id: IdUuid };
}
