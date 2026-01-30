import type { IntervaloDeTempo } from "@/core/intervalo-de-tempo";
import type { GradeHorarioOfertaFormacao } from "@/core/grade-horario-oferta-formacao";
import type {
  IGradeHorarioOfertaFormacaoIntervaloDeTempo,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoCreate,
} from "./grade-horario-oferta-formacao-intervalo-de-tempo.types";

export class GradeHorarioOfertaFormacaoIntervaloDeTempo
  implements IGradeHorarioOfertaFormacaoIntervaloDeTempo
{
  id!: string;
  intervaloDeTempo!: IntervaloDeTempo;
  gradeHorarioOfertaFormacao!: GradeHorarioOfertaFormacao;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  static criar(
    dados: IGradeHorarioOfertaFormacaoIntervaloDeTempoCreate,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempo {
    const entity = new GradeHorarioOfertaFormacaoIntervaloDeTempo();
    return entity;
  }

  static fromData(
    dados: IGradeHorarioOfertaFormacaoIntervaloDeTempo,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempo {
    const entity = new GradeHorarioOfertaFormacaoIntervaloDeTempo();
    Object.assign(entity, dados);
    return entity;
  }

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }
}
