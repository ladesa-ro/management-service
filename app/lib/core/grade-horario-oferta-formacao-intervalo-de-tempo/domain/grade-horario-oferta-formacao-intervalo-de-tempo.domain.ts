import { BaseEntity, type ScalarDateTimeString } from "@/core/@shared";
import type { GradeHorarioOfertaFormacao } from "@/core/grade-horario-oferta-formacao";
import type { IntervaloDeTempo } from "@/core/intervalo-de-tempo";
import type {
  IGradeHorarioOfertaFormacaoIntervaloDeTempo,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoCreate,
} from "./grade-horario-oferta-formacao-intervalo-de-tempo.types";

export class GradeHorarioOfertaFormacaoIntervaloDeTempo
  extends BaseEntity
  implements IGradeHorarioOfertaFormacaoIntervaloDeTempo
{
  id!: string;
  intervaloDeTempo!: IntervaloDeTempo;
  gradeHorarioOfertaFormacao!: GradeHorarioOfertaFormacao;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

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
