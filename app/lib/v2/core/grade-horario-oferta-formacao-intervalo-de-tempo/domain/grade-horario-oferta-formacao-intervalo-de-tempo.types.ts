import type { IIntervaloDeTempo } from "@/v2/core/intervalo-de-tempo/domain/intervalo-de-tempo.types";
import type { IOfertaFormacao } from "@/v2/core/oferta-formacao/domain/oferta-formacao.types";

export interface IGradeHorarioOfertaFormacaoIntervaloDeTempo {
  id: string;
  intervaloDeTempo: IIntervaloDeTempo;
  gradeHorarioOfertaFormacao: IOfertaFormacao;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export interface IGradeHorarioOfertaFormacaoIntervaloDeTempoCreate {
  intervaloDeTempo: { id: string };
  gradeHorarioOfertaFormacao: { id: string };
}
