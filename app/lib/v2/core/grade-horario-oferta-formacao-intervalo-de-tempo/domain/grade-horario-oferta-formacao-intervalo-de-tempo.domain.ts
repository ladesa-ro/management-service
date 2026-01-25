import { IntervaloDeTempo } from "../../intervalo-de-tempo/domain/intervalo-de-tempo.domain";
import { OfertaFormacao } from "../../oferta-formacao/domain/oferta-formacao.domain";

export class GradeHorarioOfertaFormacaoIntervaloDeTempo {
  id!: string;
  intervaloDeTempo!: IntervaloDeTempo;
  gradeHorarioOfertaFormacao!: OfertaFormacao;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
