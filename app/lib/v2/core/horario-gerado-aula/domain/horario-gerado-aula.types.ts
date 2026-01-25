import type { IDiarioProfessor } from "@/v2/core/diario-professor/domain/diario-professor.types";
import type { IHorarioGerado } from "@/v2/core/horario-gerado/domain/horario-gerado.types";
import type { IIntervaloDeTempo } from "@/v2/core/intervalo-de-tempo/domain/intervalo-de-tempo.types";

export interface IHorarioGeradoAula {
  id: string;
  data: Date;
  diarioProfessor: IDiarioProfessor;
  horarioGerado: IHorarioGerado;
  intervaloDeTempo: IIntervaloDeTempo;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export interface IHorarioGeradoAulaCreate {
  data: Date;
  diarioProfessor: { id: string };
  horarioGerado: { id: string };
  intervaloDeTempo: { id: string };
}
