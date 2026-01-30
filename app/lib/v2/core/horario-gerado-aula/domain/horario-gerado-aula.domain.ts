import type { DiarioProfessor } from "@/v2/core/diario-professor/domain/diario-professor.domain";
import type { HorarioGerado } from "@/v2/core/horario-gerado/domain/horario-gerado.domain";
import type { IntervaloDeTempo } from "@/v2/core/intervalo-de-tempo/domain/intervalo-de-tempo.domain";
import type { IHorarioGeradoAula, IHorarioGeradoAulaCreate } from "./horario-gerado-aula.types";

export class HorarioGeradoAula implements IHorarioGeradoAula {
  id!: string;
  data!: Date;
  diarioProfessor!: DiarioProfessor;
  horarioGerado!: HorarioGerado;
  intervaloDeTempo!: IntervaloDeTempo;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

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

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }
}
