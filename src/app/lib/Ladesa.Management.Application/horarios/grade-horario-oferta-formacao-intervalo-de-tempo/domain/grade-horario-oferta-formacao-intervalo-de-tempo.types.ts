import type { IdUuid, IEntityBase } from "@/Ladesa.Management.Application/@shared";
import type { IGradeHorarioOfertaFormacao } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao";
import type { IIntervaloDeTempo } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo";

export interface IGradeHorarioOfertaFormacaoIntervaloDeTempo extends IEntityBase {
  intervaloDeTempo: IIntervaloDeTempo | null;
  gradeHorarioOfertaFormacao: IGradeHorarioOfertaFormacao | null;
}

export interface IGradeHorarioOfertaFormacaoIntervaloDeTempoCreate {
  intervaloDeTempo: { id: IdUuid };
  gradeHorarioOfertaFormacao: { id: IdUuid };
}
