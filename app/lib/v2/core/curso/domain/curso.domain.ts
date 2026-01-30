import type { ICampus } from "@/v2/core/campus/domain/campus.types";
import type { IImagem } from "@/v2/core/imagem/domain/imagem.types";
import type { IOfertaFormacao } from "@/v2/core/oferta-formacao/domain/oferta-formacao.types";
import type { ICurso, ICursoCreate } from "./curso.types";

/**
 * Entidade de Domínio: Curso
 * Implementa a tipagem ICurso e adiciona regras de negócio
 */
export class Curso implements ICurso {
  id!: string;
  nome!: string;
  nomeAbreviado!: string;
  campus!: ICampus;
  ofertaFormacao!: IOfertaFormacao;
  imagemCapa!: IImagem | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Cria uma nova instância válida de Curso
   * @throws Error se os dados forem inválidos
   */
  static criar(dados: ICursoCreate): Curso {
    const instance = new Curso();

    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new Error("Nome é obrigatório");
    }

    if (!dados.nomeAbreviado || dados.nomeAbreviado.trim().length === 0) {
      throw new Error("Nome abreviado é obrigatório");
    }

    instance.nome = dados.nome.trim();
    instance.nomeAbreviado = dados.nomeAbreviado.trim();
    instance.imagemCapa = null;
    instance.dateCreated = new Date();
    instance.dateUpdated = new Date();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: ICurso): Curso {
    const instance = new Curso();
    Object.assign(instance, dados);
    return instance;
  }

  /**
   * Valida se o curso está ativo (não deletado)
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
   * Verifica se tem imagem de capa
   */
  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }
}
