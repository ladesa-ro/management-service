import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type {
  INivelFormacao,
  INivelFormacaoCreate,
  INivelFormacaoUpdate,
} from "./nivel-formacao.types";

/**
 * Entidade de Dominio: NivelFormacao
 * Implementa a tipagem INivelFormacao e adiciona regras de negocio
 */
export class NivelFormacao extends BaseEntity implements INivelFormacao {
  id!: IdUuid;
  slug!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "NivelFormacao";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instancia valida de NivelFormacao
   * @throws EntityValidationError se os dados forem invalidos
   */
  static criar(dados: INivelFormacaoCreate): NivelFormacao {
    const { result, rules } = this.createValidation();

    const instance = new NivelFormacao();
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
  static fromData(dados: INivelFormacao): NivelFormacao {
    const instance = new NivelFormacao();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Metodos de Dominio
  // ========================================

  /**
   * Atualiza os dados do nivel de formacao
   * @throws EntityValidationError se os dados forem invalidos
   */
  atualizar(dados: INivelFormacaoUpdate): void {
    const { result, rules } = NivelFormacao.createValidation();

    if (dados.slug !== undefined) {
      this.slug = rules.required(dados.slug, "slug");
      this.slug = rules.slug(this.slug, "slug");
    }

    NivelFormacao.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }
}
