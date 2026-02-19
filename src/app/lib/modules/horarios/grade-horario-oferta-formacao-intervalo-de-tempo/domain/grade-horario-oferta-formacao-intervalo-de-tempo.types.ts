import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { IGradeHorarioOfertaFormacao } from "@/modules/horarios/grade-horario-oferta-formacao";
import type { IIntervaloDeTempo } from "@/modules/horarios/intervalo-de-tempo";

export interface IGradeHorarioOfertaFormacaoIntervaloDeTempo extends IEntityBase {
  intervaloDeTempo: IIntervaloDeTempo | null;
  gradeHorarioOfertaFormacao: IGradeHorarioOfertaFormacao | null;
}

export interface IGradeHorarioOfertaFormacaoIntervaloDeTempoCreate {
  intervaloDeTempo: { id: IdUuid };
  gradeHorarioOfertaFormacao: { id: IdUuid };
}
