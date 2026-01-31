import type { ScalarDate, ScalarDateTimeString } from "@/core/@shared";
import type { CalendarioLetivo } from "@/core/calendario-letivo";
import type { IEtapa, IEtapaCreate } from "./etapa.types";

export class Etapa implements IEtapa {
  id!: string;
  numero!: number | null;
  dataInicio!: ScalarDate;
  dataTermino!: ScalarDate;
  cor!: string | null;
  calendario!: CalendarioLetivo;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  static criar(dados: IEtapaCreate): Etapa {
    const etapa = new Etapa();
    etapa.numero = dados.numero ?? null;
    etapa.dataInicio = dados.dataInicio;
    etapa.dataTermino = dados.dataTermino;
    etapa.cor = dados.cor ?? null;
    return etapa;
  }

  static fromData(dados: IEtapa): Etapa {
    const etapa = new Etapa();
    Object.assign(etapa, dados);
    return etapa;
  }

  isAtiva(): boolean {
    return this.dateDeleted === null;
  }
}
