import type { CalendarioLetivo } from "@/v2/core/calendario-letivo/domain/calendario-letivo.domain";
import type { IDiaCalendario, IDiaCalendarioCreate } from "./dia-calendario.types";

export class DiaCalendario implements IDiaCalendario {
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

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

  static criar(dados: IDiaCalendarioCreate): DiaCalendario {
    const diaCalendario = new DiaCalendario();
    Object.assign(diaCalendario, dados);
    return diaCalendario;
  }

  static fromData(dados: IDiaCalendario): DiaCalendario {
    const diaCalendario = new DiaCalendario();
    Object.assign(diaCalendario, dados);
    return diaCalendario;
  }
}
