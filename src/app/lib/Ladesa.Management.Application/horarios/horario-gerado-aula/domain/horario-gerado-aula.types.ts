import type {
  IdUuid,
  IEntityBase,
  ScalarDateTimeString,
} from "@/Ladesa.Management.Application/@shared";
import type { IDiarioProfessor } from "@/Ladesa.Management.Application/ensino/diario-professor/domain/diario-professor.types";
import type { IHorarioGerado } from "@/Ladesa.Management.Application/horarios/horario-gerado";
import type { IIntervaloDeTempo } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/domain/intervalo-de-tempo.types";

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
