import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { IModalidade } from "@/modules/modalidade";
import type {
  IOfertaFormacao,
  IOfertaFormacaoCreate,
  IOfertaFormacaoUpdate,
} from "./oferta-formacao.types";

/**
 * Entidade de Dominio: OfertaFormacao
 * Implementa a tipagem IOfertaFormacao e adiciona regras de negocio
 */
export class OfertaFormacao extends BaseEntity implements IOfertaFormacao {
  id!: IdUuid;
  nome!: string;
  slug!: string;
  modalidade!: IModalidade;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "OfertaFormacao";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instancia valida de OfertaFormacao
   * @throws EntityValidationError se os dados forem invalidos
   */
  static criar(dados: IOfertaFormacaoCreate): OfertaFormacao {
    const { result, rules } = this.createValidation();

    const instance = new OfertaFormacao();
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
  static fromData(dados: IOfertaFormacao): OfertaFormacao {
    const instance = new OfertaFormacao();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Metodos de Dominio
  // ========================================

  /**
   * Atualiza os dados da oferta de formacao
   * @throws EntityValidationError se os dados forem invalidos
   */
  atualizar(dados: IOfertaFormacaoUpdate): void {
    const { result, rules } = OfertaFormacao.createValidation();

    if (dados.nome !== undefined) {
      this.nome = rules.required(dados.nome, "nome");
      this.nome = rules.minLength(this.nome, "nome", 1);
    }

    if (dados.slug !== undefined) {
      this.slug = rules.required(dados.slug, "slug");
      this.slug = rules.slug(this.slug, "slug");
    }

    OfertaFormacao.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }
}
