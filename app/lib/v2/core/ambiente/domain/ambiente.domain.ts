import type { IBloco } from "@/v2/core/bloco/domain/bloco.types";
import type { IAmbiente, IAmbienteCreate } from "./ambiente.types";

/**
 * Entidade de Domínio: Ambiente
 * Implementa a tipagem IAmbiente e adiciona regras de negócio
 */
export class Ambiente implements IAmbiente {
  id!: string;
  nome!: string;
  descricao!: string | null;
  codigo!: string;
  capacidade!: number | null;
  tipo!: string | null;
  bloco!: IBloco;
  imagemCapa!: { id: string } | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Valida se o ambiente está ativo (não deletado)
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

  /**
   * Valida se pode ser deletado
   */
  podeSerDeletado(): boolean {
    return this.isAtivo();
  }

  /**
   * Verifica se o ambiente tem imagem de capa
   */
  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }

  /**
   * Verifica se o ambiente tem capacidade definida
   */
  temCapacidade(): boolean {
    return this.capacidade !== null && this.capacidade > 0;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Ambiente
   * @throws Error se os dados forem inválidos
   */
  static criar(dados: IAmbienteCreate): Ambiente {
    const instance = new Ambiente();

    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new Error("Nome é obrigatório");
    }

    if (!dados.codigo || dados.codigo.trim().length === 0) {
      throw new Error("Código é obrigatório");
    }

    instance.nome = dados.nome.trim();
    instance.descricao = dados.descricao ?? null;
    instance.codigo = dados.codigo.trim();
    instance.capacidade = dados.capacidade ?? null;
    instance.tipo = dados.tipo ?? null;
    instance.imagemCapa = null;
    instance.dateCreated = new Date();
    instance.dateUpdated = new Date();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IAmbiente): Ambiente {
    const instance = new Ambiente();
    Object.assign(instance, dados);
    return instance;
  }
}
