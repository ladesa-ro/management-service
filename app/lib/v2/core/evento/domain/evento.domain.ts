import { Ambiente } from "../../ambiente/domain/ambiente.domain";
import { CalendarioLetivo } from "../../calendario-letivo/domain/calendario-letivo.domain";

export class Evento {
  id!: string;
  nome!: string | null;
  rrule!: string;
  cor!: string | null;
  data_inicio!: Date | null;
  data_fim!: Date | null;
  calendario!: CalendarioLetivo;
  ambiente!: Ambiente | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
