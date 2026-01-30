import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { IGradeHorarioOfertaFormacao } from "@/core/grade-horario-oferta-formacao";
import type { IIntervaloDeTempo } from "@/core/intervalo-de-tempo";

export interface IGradeHorarioOfertaFormacaoIntervaloDeTempo {
  id: IdUuid;
  intervaloDeTempo: IIntervaloDeTempo;
  gradeHorarioOfertaFormacao: IGradeHorarioOfertaFormacao;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

export interface IGradeHorarioOfertaFormacaoIntervaloDeTempoCreate {
  intervaloDeTempo: { id: IdUuid };
  gradeHorarioOfertaFormacao: { id: IdUuid };
}
