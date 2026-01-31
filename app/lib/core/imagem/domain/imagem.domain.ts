import { BaseEntity, type ScalarDateTimeString } from "@/core/@shared";
import type { IImagem, IImagemCreate } from "./imagem.types";

/**
 * Entidade de Dominio: Imagem
 * Implementa a tipagem IImagem e adiciona regras de negocio
 */
export class Imagem extends BaseEntity implements IImagem {
  id!: string;
  descricao!: string | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instancia de Imagem
   */
  static criar(dados: IImagemCreate): Imagem {
    const instance = new Imagem();
    instance.descricao = dados.descricao ?? null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;
    return instance;
  }

  /**
   * Reconstroi uma instancia a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IImagem): Imagem {
    const instance = new Imagem();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Metodos especificos do dominio Imagem
  // ========================================

  /**
   * Verifica se tem descricao
   */
  temDescricao(): boolean {
    return this.descricao !== null && this.descricao.trim().length > 0;
  }
}
