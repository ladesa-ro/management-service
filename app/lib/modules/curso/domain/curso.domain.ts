import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { ICampus } from "@/modules/campus";
import type { IImagem } from "@/modules/imagem";
import type { IOfertaFormacao } from "@/modules/oferta-formacao";
import type { ICurso, ICursoCreate, ICursoUpdate } from "./curso.types";

/**
 * Entidade de Dominio: Curso
 * Implementa a tipagem ICurso e adiciona regras de negocio
 */
export class Curso extends BaseEntity implements ICurso {
  id!: IdUuid;
  nome!: string;
  nomeAbreviado!: string;
  campus!: ICampus;
  ofertaFormacao!: IOfertaFormacao;
  imagemCapa!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Curso";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instancia valida de Curso
   * @throws EntityValidationError se os dados forem invalidos
   */
  static criar(dados: ICursoCreate): Curso {
    const { result, rules } = this.createValidation();

    const instance = new Curso();
    instance.nome = rules.required(dados.nome, "nome");
    instance.nome = rules.minLength(instance.nome, "nome", 1);

    instance.nomeAbreviado = rules.required(dados.nomeAbreviado, "nomeAbreviado");
    instance.nomeAbreviado = rules.minLength(instance.nomeAbreviado, "nomeAbreviado", 1);

    this.throwIfInvalid(result);

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
  // Metodos de Dominio
  // ========================================

  /**
   * Atualiza os dados do curso
   * @throws EntityValidationError se os dados forem invalidos
   */
  atualizar(dados: ICursoUpdate): void {
    const { result, rules } = Curso.createValidation();

    if (dados.nome !== undefined) {
      this.nome = rules.required(dados.nome, "nome");
      this.nome = rules.minLength(this.nome, "nome", 1);
    }

    if (dados.nomeAbreviado !== undefined) {
      this.nomeAbreviado = rules.required(dados.nomeAbreviado, "nomeAbreviado");
      this.nomeAbreviado = rules.minLength(this.nomeAbreviado, "nomeAbreviado", 1);
    }

    Curso.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
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
