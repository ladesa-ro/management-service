import type { ICampus } from "@/v2/core/campus/domain/campus.types";
import type { IOfertaFormacao } from "@/v2/core/oferta-formacao/domain/oferta-formacao.types";
import type { ICalendarioLetivo, ICalendarioLetivoCreate } from "./calendario-letivo.types";

/**
 * Entidade de Domínio: CalendarioLetivo
 * Implementa a tipagem ICalendarioLetivo e adiciona regras de negócio
 */
export class CalendarioLetivo implements ICalendarioLetivo {
  id!: string;
  nome!: string;
  ano!: number;
  campus!: ICampus;
  ofertaFormacao!: IOfertaFormacao;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  static criar(dados: ICalendarioLetivoCreate): CalendarioLetivo {
    const instance = new CalendarioLetivo();

    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new Error("Nome é obrigatório");
    }

    if (!dados.ano || dados.ano <= 0) {
      throw new Error("Ano é obrigatório e deve ser positivo");
    }

    instance.nome = dados.nome.trim();
    instance.ano = dados.ano;
    instance.dateCreated = new Date();
    instance.dateUpdated = new Date();
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
