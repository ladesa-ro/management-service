import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { IModalidade, IModalidadeCreate, IModalidadeUpdate } from "./modalidade.types";

/**
 * Entidade de Dominio: Modalidade
 * Implementa a tipagem IModalidade e adiciona regras de negocio
 */
export class Modalidade extends BaseEntity implements IModalidade {
  id!: IdUuid;
  nome!: string;
  slug!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Modalidade";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instancia valida de Modalidade
   * @throws EntityValidationError se os dados forem invalidos
   */
  static criar(dados: IModalidadeCreate): Modalidade {
    const { result, rules } = this.createValidation();

    const instance = new Modalidade();
    instance.nome = rules.required(dados.nome, "nome");
    instance.nome = rules.minLength(instance.nome, "nome", 1);

    instance.slug = rules.required(dados.slug, "slug");
    instance.slug = rules.slug(instance.slug, "slug");

    this.throwIfInvalid(result);

    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstroi uma instancia a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IModalidade): Modalidade {
    const instance = new Modalidade();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Metodos de Dominio
  // ========================================

  /**
   * Atualiza os dados da modalidade
   * @throws EntityValidationError se os dados forem invalidos
   */
  atualizar(dados: IModalidadeUpdate): void {
    const { result, rules } = Modalidade.createValidation();

    if (dados.nome !== undefined) {
      this.nome = rules.required(dados.nome, "nome");
      this.nome = rules.minLength(this.nome, "nome", 1);
    }

    if (dados.slug !== undefined) {
      this.slug = rules.required(dados.slug, "slug");
      this.slug = rules.slug(this.slug, "slug");
    }

    Modalidade.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }
}
