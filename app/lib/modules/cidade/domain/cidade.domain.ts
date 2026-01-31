import type { IdNumeric } from "@/modules/@shared";
import type { IEstado } from "@/modules/estado";
import type { ICidade } from "./cidade.types";

/**
 * Entidade de Domínio: Cidade
 * Entidade de referência (somente leitura do IBGE)
 */
export class Cidade implements ICidade {
  id!: IdNumeric;
  nome!: string;
  estado!: IEstado;

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: ICidade): Cidade {
    const instance = new Cidade();
    instance.id = dados.id;
    instance.nome = dados.nome;
    instance.estado = dados.estado;
    return instance;
  }

  // ========================================
  // Métodos específicos do domínio
  // ========================================

  getNomeCompleto(): string {
    return `${this.nome} - ${this.estado.sigla}`;
  }
}
