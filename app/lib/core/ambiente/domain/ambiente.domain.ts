import { BaseEntity, type ScalarDateTimeString } from "@/core/@shared";
import type { IBloco } from "@/core/bloco";
import type { IAmbiente, IAmbienteCreate } from "./ambiente.types";

/**
 * Entidade de Domínio: Ambiente
 * Implementa a tipagem IAmbiente e adiciona regras de negócio
 */
export class Ambiente extends BaseEntity implements IAmbiente {
  id!: string;
  nome!: string;
  descricao!: string | null;
  codigo!: string;
  capacidade!: number | null;
  tipo!: string | null;
  bloco!: IBloco;
  imagemCapa!: { id: string } | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  // ========================================
  // Métodos de Domínio
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
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
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

  // ========================================
  // Métodos específicos do domínio Ambiente
  // ========================================

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
}
