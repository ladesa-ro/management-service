import type { IdUuid, IEntityBase, ScalarDateTimeString } from "@/modules/@shared";
import type { IDiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.types";
import type { IHorarioGerado } from "@/modules/sisgha/horario-gerado";
import type { IIntervaloDeTempo } from "@/modules/sisgha/intervalo-de-tempo/domain/intervalo-de-tempo.types";

export interface IHorarioGeradoAula extends IEntityBase {
  data: ScalarDateTimeString;
  diarioProfessor: IDiarioProfessor;
  horarioGerado: IHorarioGerado;
  intervaloDeTempo: IIntervaloDeTempo;
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
