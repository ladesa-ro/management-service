import { BaseDatedEntity } from "@/modules/@shared";
import type { IImagem } from "@/modules/base/armazenamento/imagem";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao";
import type { ICampus } from "@/modules/sisgea/campus";
import type { ICurso, ICursoCreate, ICursoUpdate } from "./curso.types";

/**
 * Entidade de Dominio: Curso
 * Implementa a tipagem ICurso e adiciona regras de negocio
 */
export class Curso extends BaseDatedEntity implements ICurso {
  nome!: string;
  nomeAbreviado!: string;
  campus!: ICampus;
  ofertaFormacao!: IOfertaFormacao;
  imagemCapa!: IImagem | null;

  protected static get entityName(): string {
    return "Curso";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Curso.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.nomeAbreviado, "nomeAbreviado");
    rules.minLength(this.nomeAbreviado, "nomeAbreviado", 1);
    Curso.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instancia valida de Curso
   * @throws EntityValidationError se os dados forem invalidos
   */
  static criar(dados: ICursoCreate): Curso {
    const instance = new Curso();
    instance.nome = dados.nome?.trim() ?? "";
    instance.nomeAbreviado = dados.nomeAbreviado?.trim() ?? "";
    instance.imagemCapa = null;
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstroi uma instancia a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Curso {
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
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }

    if (dados.nomeAbreviado !== undefined) {
      this.nomeAbreviado = dados.nomeAbreviado?.trim() ?? "";
    }

    this.touchUpdated();
    this.validar();
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
