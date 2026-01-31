import { BaseEntity, type ScalarDate, type ScalarDateTimeString } from "@/core/@shared";
import type { DiarioProfessor } from "@/core/diario-professor/domain/diario-professor.domain";
import type { HorarioGerado } from "@/core/horario-gerado";
import type { IntervaloDeTempo } from "@/core/intervalo-de-tempo/domain/intervalo-de-tempo.domain";
import type { IHorarioGeradoAula, IHorarioGeradoAulaCreate } from "./horario-gerado-aula.types";

export class HorarioGeradoAula extends BaseEntity implements IHorarioGeradoAula {
  id!: string;
  data!: ScalarDate;
  diarioProfessor!: DiarioProfessor;
  horarioGerado!: HorarioGerado;
  intervaloDeTempo!: IntervaloDeTempo;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  static criar(dados: IHorarioGeradoAulaCreate): HorarioGeradoAula {
    const horarioGeradoAula = new HorarioGeradoAula();
    horarioGeradoAula.data = dados.data;
    return horarioGeradoAula;
  }

  static fromData(dados: IHorarioGeradoAula): HorarioGeradoAula {
    const horarioGeradoAula = new HorarioGeradoAula();
    Object.assign(horarioGeradoAula, dados);
    return horarioGeradoAula;
  }
}
