import type { IGradeHorarioOfertaFormacao } from "@/core/grade-horario-oferta-formacao";
import type { IIntervaloDeTempo } from "@/core/intervalo-de-tempo";

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
