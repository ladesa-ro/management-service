import type { IEstado } from "@/v2/core/estado/domain/estado.types";
import type { ICidade } from "./cidade.types";

/**
 * Entidade de Domínio: Cidade
 * Implementa a tipagem ICidade e adiciona regras de negócio
 */
export class Cidade implements ICidade {
  id!: number;
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
  // Métodos de Domínio
  // ========================================

  /**
   * Retorna o nome completo da cidade com estado
   */
  getNomeCompleto(): string {
    return `${this.nome} - ${this.estado.sigla}`;
  }
}
