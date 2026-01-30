import type { IIntervaloDeTempo } from "@/core/intervalo-de-tempo";
import type { IGradeHorarioOfertaFormacao } from "@/core/grade-horario-oferta-formacao";

export interface IGradeHorarioOfertaFormacaoIntervaloDeTempo {
  id: string;
  intervaloDeTempo: IIntervaloDeTempo;
  gradeHorarioOfertaFormacao: IGradeHorarioOfertaFormacao;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export interface IGradeHorarioOfertaFormacaoIntervaloDeTempoCreate {
  intervaloDeTempo: { id: string };
  gradeHorarioOfertaFormacao: { id: string };
}
