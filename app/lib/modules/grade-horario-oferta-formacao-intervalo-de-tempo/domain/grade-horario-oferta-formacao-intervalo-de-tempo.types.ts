import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { IGradeHorarioOfertaFormacao } from "@/modules/grade-horario-oferta-formacao";
import type { IIntervaloDeTempo } from "@/modules/intervalo-de-tempo";

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
