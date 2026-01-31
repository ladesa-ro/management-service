import { BaseEntity, type ScalarDateTimeString } from "@/core/@shared";
import type { ICampus } from "@/core/campus";
import type { IImagem } from "@/core/imagem";
import type { IOfertaFormacao } from "@/core/oferta-formacao";
import type { ICurso, ICursoCreate } from "./curso.types";

/**
 * Entidade de Dominio: Curso
 * Implementa a tipagem ICurso e adiciona regras de negocio
 */
export class Curso extends BaseEntity implements ICurso {
  id!: string;
  nome!: string;
  nomeAbreviado!: string;
  campus!: ICampus;
  ofertaFormacao!: IOfertaFormacao;
  imagemCapa!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  // ========================================
  // Metodos de Dominio
  // ========================================

  /**
   * Cria uma nova instancia valida de Curso
   * @throws Error se os dados forem invalidos
   */
  static criar(dados: ICursoCreate): Curso {
    const instance = new Curso();

    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new Error("Nome e obrigatorio");
    }

    if (!dados.nomeAbreviado || dados.nomeAbreviado.trim().length === 0) {
      throw new Error("Nome abreviado e obrigatorio");
    }

    instance.nome = dados.nome.trim();
    instance.nomeAbreviado = dados.nomeAbreviado.trim();
    instance.imagemCapa = null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstroi uma instancia a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: ICurso): Curso {
    const instance = new Curso();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Metodos especificos do dominio Curso
  // ========================================

  /**
   * Verifica se tem imagem de capa
   */
  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }
}
