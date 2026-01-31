import type { ScalarDate, ScalarDateTimeString } from "@/core/@shared";
import type { CalendarioLetivo } from "@/core/calendario-letivo";
import type { IDiaCalendario, IDiaCalendarioCreate } from "./dia-calendario.types";

export class DiaCalendario implements IDiaCalendario {
  id!: string;
  data!: ScalarDate;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivo;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

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

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }
}
