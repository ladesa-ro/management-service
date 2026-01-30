import { IdNumeric } from "@/core/@shared";
import type { IEstado } from "./estado.types";

/**
 * Entidade de Domínio: Estado
 * Implementa a tipagem IEstado e adiciona regras de negócio
 */
export class Estado implements IEstado {
  id!: IdNumeric;

  nome!: string;
  sigla!: string;

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IEstado): Estado {
    const instance = new Estado();

    instance.id = dados.id;

    instance.nome = dados.nome;
    instance.sigla = dados.sigla;

    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Valida se a sigla tem o formato correto (2 caracteres maiúsculos)
   */
  isSiglaValida(): boolean {
    return /^[A-Z]{2}$/.test(this.sigla);
  }
}
