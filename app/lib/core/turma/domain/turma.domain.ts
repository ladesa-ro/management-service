import { BaseEntity, type ScalarDateTimeString } from "@/core/@shared";
import type { IAmbiente } from "@/core/ambiente/domain/ambiente.types";
import type { ICurso } from "@/core/curso";
import type { IImagem } from "@/core/imagem/domain/imagem.types";
import type { ITurma, ITurmaCreate } from "./turma.types";

/**
 * Entidade de Domínio: Turma
 * Implementa a tipagem ITurma e adiciona regras de negócio
 */
export class Turma extends BaseEntity implements ITurma {
  id!: string;
  periodo!: string;
  ambientePadraoAula!: IAmbiente | null;
  curso!: ICurso;
  imagemCapa!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Cria uma nova instância válida de Turma
   * @throws Error se os dados forem inválidos
   */
  static criar(dados: ITurmaCreate): Turma {
    const instance = new Turma();

    if (!dados.periodo || dados.periodo.trim().length === 0) {
      throw new Error("Período é obrigatório");
    }

    instance.periodo = dados.periodo.trim();
    instance.ambientePadraoAula = null;
    instance.imagemCapa = null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: ITurma): Turma {
    const instance = new Turma();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos específicos do domínio Turma
  // ========================================

  /**
   * Verifica se tem ambiente padrão de aula
   */
  temAmbientePadraoAula(): boolean {
    return this.ambientePadraoAula !== null;
  }

  /**
   * Verifica se tem imagem de capa
   */
  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }
}
