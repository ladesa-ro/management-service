import { CalendarioLetivo } from "../../calendario-letivo/domain/calendario-letivo.domain";

export class DiaCalendario {
  id!: string;
  data!: Date;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivo;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
