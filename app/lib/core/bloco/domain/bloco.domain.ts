import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/core/@shared";
import type { ICampus } from "@/core/campus";
import type { IBloco, IBlocoCreate, IBlocoUpdate } from "./bloco.types";

/**
 * Entidade de Domínio: Bloco
 * Implementa a tipagem IBloco e adiciona regras de negócio
 */
export class Bloco extends BaseEntity implements IBloco {
  id!: IdUuid;
  nome!: string;
  codigo!: string;
  campus!: ICampus;
  imagemCapa!: { id: string } | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Bloco";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Bloco
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IBlocoCreate): Bloco {
    const { result, rules } = this.createValidation();

    const instance = new Bloco();
    instance.nome = rules.required(dados.nome, "nome");
    instance.nome = rules.minLength(instance.nome, "nome", 1);

    instance.codigo = rules.required(dados.codigo, "codigo");
    instance.codigo = rules.minLength(instance.codigo, "codigo", 1);

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
  static fromData(dados: IBloco): Bloco {
    const instance = new Bloco();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do bloco
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IBlocoUpdate): void {
    const { result, rules } = Bloco.createValidation();

    if (dados.nome !== undefined) {
      this.nome = rules.required(dados.nome, "nome");
      this.nome = rules.minLength(this.nome, "nome", 1);
    }

    if (dados.codigo !== undefined) {
      this.codigo = rules.required(dados.codigo, "codigo");
      this.codigo = rules.minLength(this.codigo, "codigo", 1);
    }

    Bloco.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }

  // ========================================
  // Métodos específicos do domínio Bloco
  // ========================================

  /**
   * Verifica se o bloco tem imagem de capa
   */
  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }
}
