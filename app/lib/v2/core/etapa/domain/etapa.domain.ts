import { CalendarioLetivo } from "../../calendario-letivo/domain/calendario-letivo.domain";

export class Etapa {
  id!: string;
  numero!: number | null;
  dataInicio!: Date;
  dataTermino!: Date;
  cor!: string | null;
  calendario!: CalendarioLetivo;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
