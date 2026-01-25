import type { IntervaloDeTempo } from "@/v2/core/intervalo-de-tempo/domain/intervalo-de-tempo.domain";
import type { OfertaFormacao } from "@/v2/core/oferta-formacao/domain/oferta-formacao.domain";
import type {
  IGradeHorarioOfertaFormacaoIntervaloDeTempo,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoCreate,
} from "./grade-horario-oferta-formacao-intervalo-de-tempo.types";

export class GradeHorarioOfertaFormacaoIntervaloDeTempo
  implements IGradeHorarioOfertaFormacaoIntervaloDeTempo
{
  id!: string;
  intervaloDeTempo!: IntervaloDeTempo;
  gradeHorarioOfertaFormacao!: OfertaFormacao;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

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
}
