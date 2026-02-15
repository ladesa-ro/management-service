import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { IGradeHorarioOfertaFormacao } from "@/modules/sisgha/grade-horario-oferta-formacao";
import type { IIntervaloDeTempo } from "@/modules/sisgha/intervalo-de-tempo";

export interface IGradeHorarioOfertaFormacaoIntervaloDeTempo extends IEntityBase {
  intervaloDeTempo: IIntervaloDeTempo | null;
  gradeHorarioOfertaFormacao: IGradeHorarioOfertaFormacao | null;
}

export interface IGradeHorarioOfertaFormacaoIntervaloDeTempoCreate {
  intervaloDeTempo: { id: IdUuid };
  gradeHorarioOfertaFormacao: { id: IdUuid };
}
