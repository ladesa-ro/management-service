import { Ambiente } from "../../ambiente/domain/ambiente.domain";
import { Diario } from "../../diario/domain/diario.domain";
import { IntervaloDeTempo } from "../../intervalo-de-tempo/domain/intervalo-de-tempo.domain";

export class Aula {
  id!: string;
  data!: Date;
  modalidade!: string | null;
  intervaloDeTempo!: IntervaloDeTempo;
  diario!: Diario;
  ambiente!: Ambiente | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
