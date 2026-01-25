import type { CalendarioLetivo } from "@/v2/core/calendario-letivo/domain/calendario-letivo.domain";
import type { IEtapa, IEtapaCreate } from "./etapa.types";

export class Etapa implements IEtapa {
  id!: string;
  numero!: number | null;
  dataInicio!: Date;
  dataTermino!: Date;
  cor!: string | null;
  calendario!: CalendarioLetivo;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  isAtiva(): boolean {
    return this.dateDeleted === null;
  }

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
}
