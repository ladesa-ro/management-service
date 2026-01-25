import { DiarioProfessor } from "../../diario-professor/domain/diario-professor.domain";
import { HorarioGerado } from "../../horario-gerado/domain/horario-gerado.domain";
import { IntervaloDeTempo } from "../../intervalo-de-tempo/domain/intervalo-de-tempo.domain";

export class HorarioGeradoAula {
  id!: string;
  data!: Date;
  diarioProfessor!: DiarioProfessor;
  horarioGerado!: HorarioGerado;
  intervaloDeTempo!: IntervaloDeTempo;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
