import type { IImagem } from "@/core/imagem/domain/imagem.types";
import type { IDisciplina, IDisciplinaCreate } from "./disciplina.types";

/**
 * Entidade de Domínio: Disciplina
 * Implementa a tipagem IDisciplina e adiciona regras de negócio
 */
export class Disciplina implements IDisciplina {
  id!: string;
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa!: IImagem | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Cria uma nova instância válida de Disciplina
   * @throws Error se os dados forem inválidos
   */
  static criar(dados: IDisciplinaCreate): Disciplina {
    const instance = new Disciplina();

    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new Error("Nome é obrigatório");
    }

    if (!dados.nomeAbreviado || dados.nomeAbreviado.trim().length === 0) {
      throw new Error("Nome abreviado é obrigatório");
    }

    if (dados.cargaHoraria <= 0) {
      throw new Error("Carga horária deve ser maior que zero");
    }

    instance.nome = dados.nome.trim();
    instance.nomeAbreviado = dados.nomeAbreviado.trim();
    instance.cargaHoraria = dados.cargaHoraria;
    instance.imagemCapa = null;
    instance.dateCreated = new Date();
    instance.dateUpdated = new Date();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IDisciplina): Disciplina {
    const instance = new Disciplina();
    Object.assign(instance, dados);
    return instance;
  }

  /**
   * Valida se a disciplina está ativa (não deletada)
   */
  isAtiva(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Valida se pode ser editada
   */
  podeSerEditada(): boolean {
    return this.isAtiva();
  }

  /**
   * Valida se pode ser deletada
   */
  podeSerDeletada(): boolean {
    return this.isAtiva();
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Verifica se tem imagem de capa
   */
  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }

  /**
   * Verifica se a carga horária é válida
   */
  temCargaHorariaValida(): boolean {
    return this.cargaHoraria > 0;
  }
}
