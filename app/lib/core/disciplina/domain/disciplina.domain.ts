import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/core/@shared";
import type { IImagem } from "@/core/imagem/domain/imagem.types";
import type { IDisciplina, IDisciplinaCreate, IDisciplinaUpdate } from "./disciplina.types";

/**
 * Entidade de Domínio: Disciplina
 * Implementa a tipagem IDisciplina e adiciona regras de negócio
 */
export class Disciplina extends BaseEntity implements IDisciplina {
  id!: IdUuid;
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Disciplina";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Disciplina
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IDisciplinaCreate): Disciplina {
    const { result, rules } = this.createValidation();

    const instance = new Disciplina();
    instance.nome = rules.required(dados.nome, "nome");
    instance.nome = rules.minLength(instance.nome, "nome", 1);

    instance.nomeAbreviado = rules.required(dados.nomeAbreviado, "nomeAbreviado");
    instance.nomeAbreviado = rules.minLength(instance.nomeAbreviado, "nomeAbreviado", 1);

    instance.cargaHoraria = rules.requiredNumber(dados.cargaHoraria, "cargaHoraria");
    instance.cargaHoraria = rules.min(
      instance.cargaHoraria,
      "cargaHoraria",
      1,
      "Carga horária deve ser maior que zero",
    );

    this.throwIfInvalid(result);

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
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da disciplina
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IDisciplinaUpdate): void {
    const { result, rules } = Disciplina.createValidation();

    if (dados.nome !== undefined) {
      this.nome = rules.required(dados.nome, "nome");
      this.nome = rules.minLength(this.nome, "nome", 1);
    }

    if (dados.nomeAbreviado !== undefined) {
      this.nomeAbreviado = rules.required(dados.nomeAbreviado, "nomeAbreviado");
      this.nomeAbreviado = rules.minLength(this.nomeAbreviado, "nomeAbreviado", 1);
    }

    if (dados.cargaHoraria !== undefined) {
      this.cargaHoraria = rules.requiredNumber(dados.cargaHoraria, "cargaHoraria");
      this.cargaHoraria = rules.min(
        this.cargaHoraria,
        "cargaHoraria",
        1,
        "Carga horária deve ser maior que zero",
      );
    }

    Disciplina.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
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
