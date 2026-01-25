import { Diario } from "../../diario/domain/diario.domain";
import { IntervaloDeTempo } from "../../intervalo-de-tempo/domain/intervalo-de-tempo.domain";

export class DiarioPreferenciaAgrupamento {
  id!: string;
  dataInicio!: Date;
  dataFim!: Date | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  intervaloDeTempo!: IntervaloDeTempo;
  diario!: Diario;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
