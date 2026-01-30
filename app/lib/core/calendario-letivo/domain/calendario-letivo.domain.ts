import type { ICampus } from "@/core/campus";
import type { IOfertaFormacao } from "@/core/oferta-formacao";
import { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { ICalendarioLetivo, ICalendarioLetivoCreate } from "./calendario-letivo.types";

/**
 * Entidade de Dominio: CalendarioLetivo
 * Implementa a tipagem ICalendarioLetivo e adiciona regras de negocio
 */
export class CalendarioLetivo implements ICalendarioLetivo {
  id!: IdUuid;
  nome!: string;
  ano!: number;
  campus!: ICampus;
  ofertaFormacao!: IOfertaFormacao;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  // ========================================
  // Metodos de Dominio
  // ========================================

  static criar(dados: ICalendarioLetivoCreate): CalendarioLetivo {
    const instance = new CalendarioLetivo();

    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new Error("Nome e obrigatorio");
    }

    if (!dados.ano || dados.ano <= 0) {
      throw new Error("Ano e obrigatorio e deve ser positivo");
    }

    instance.nome = dados.nome.trim();
    instance.ano = dados.ano;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  static fromData(dados: ICalendarioLetivo): CalendarioLetivo {
    const instance = new CalendarioLetivo();
    Object.assign(instance, dados);
    return instance;
  }

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

  // ========================================
  // Factory Methods
  // ========================================

  podeSerEditado(): boolean {
    return this.isAtivo();
  }

  podeSerDeletado(): boolean {
    return this.isAtivo();
  }
}
