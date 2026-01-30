import type { ICampus } from "@/v2/core/campus/domain/campus.types";
import type { IBloco, IBlocoCreate } from "./bloco.types";

/**
 * Entidade de Domínio: Bloco
 * Implementa a tipagem IBloco e adiciona regras de negócio
 */
export class Bloco implements IBloco {
  id!: string;
  nome!: string;
  codigo!: string;
  campus!: ICampus;
  imagemCapa!: { id: string } | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Cria uma nova instância válida de Bloco
   * @throws Error se os dados forem inválidos
   */
  static criar(dados: IBlocoCreate): Bloco {
    const instance = new Bloco();

    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new Error("Nome é obrigatório");
    }

    if (!dados.codigo || dados.codigo.trim().length === 0) {
      throw new Error("Código é obrigatório");
    }

    instance.nome = dados.nome.trim();
    instance.codigo = dados.codigo.trim();
    instance.imagemCapa = null;
    instance.dateCreated = new Date();
    instance.dateUpdated = new Date();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IBloco): Bloco {
    const instance = new Bloco();
    Object.assign(instance, dados);
    return instance;
  }

  /**
   * Valida se o bloco está ativo (não deletado)
   */
  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Valida se pode ser editado
   */
  podeSerEditado(): boolean {
    return this.isAtivo();
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Valida se pode ser deletado
   */
  podeSerDeletado(): boolean {
    return this.isAtivo();
  }

  /**
   * Verifica se o bloco tem imagem de capa
   */
  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }
}
