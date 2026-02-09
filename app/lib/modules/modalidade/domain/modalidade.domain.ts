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
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Modalidade.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.slug, "slug");
    rules.slug(this.slug, "slug");
    Modalidade.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instancia valida de Modalidade
   * @throws EntityValidationError se os dados forem invalidos
   */
  static criar(dados: IModalidadeCreate): Modalidade {
    const instance = new Modalidade();
    instance.nome = dados.nome;
    instance.slug = dados.slug;

    instance.initDates();
    instance.validar();

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
    if (dados.nome !== undefined) {
      this.nome = dados.nome;
    }

    if (dados.slug !== undefined) {
      this.slug = dados.slug;
    }

    this.touchUpdated();
    this.validar();
  }
}
