import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/core/@shared";
import type { IAmbiente } from "@/core/ambiente/domain/ambiente.types";
import type { ICurso } from "@/core/curso";
import type { IImagem } from "@/core/imagem/domain/imagem.types";
import type { ITurma, ITurmaCreate, ITurmaUpdate } from "./turma.types";

/**
 * Entidade de Domínio: Turma
 * Implementa a tipagem ITurma e adiciona regras de negócio
 */
export class Turma extends BaseEntity implements ITurma {
  id!: IdUuid;
  periodo!: string;
  ambientePadraoAula!: IAmbiente | null;
  curso!: ICurso;
  imagemCapa!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Turma";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Turma
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: ITurmaCreate): Turma {
    const { result, rules } = this.createValidation();

    const instance = new Turma();
    instance.periodo = rules.required(dados.periodo, "periodo");
    instance.periodo = rules.minLength(instance.periodo, "periodo", 1);

    this.throwIfInvalid(result);

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
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da turma
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: ITurmaUpdate): void {
    const { result, rules } = Turma.createValidation();

    if (dados.periodo !== undefined) {
      this.periodo = rules.required(dados.periodo, "periodo");
      this.periodo = rules.minLength(this.periodo, "periodo", 1);
    }

    Turma.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
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
