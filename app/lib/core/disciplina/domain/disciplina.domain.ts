import { BaseEntity, type ScalarDateTimeString } from "@/core/@shared";
import type { IImagem } from "@/core/imagem/domain/imagem.types";
import type { IDisciplina, IDisciplinaCreate } from "./disciplina.types";

/**
 * Entidade de Domínio: Disciplina
 * Implementa a tipagem IDisciplina e adiciona regras de negócio
 */
export class Disciplina extends BaseEntity implements IDisciplina {
  id!: string;
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

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
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
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

  // ========================================
  // Métodos específicos do domínio Disciplina
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
