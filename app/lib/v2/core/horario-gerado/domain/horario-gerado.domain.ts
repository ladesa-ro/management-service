import { CalendarioLetivo } from "../../calendario-letivo/domain/calendario-letivo.domain";

export class HorarioGerado {
  id!: string;
  status!: string | null;
  tipo!: string | null;
  dataGeracao!: Date | null;
  vigenciaInicio!: Date | null;
  vigenciaFim!: Date | null;
  calendario!: CalendarioLetivo;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
