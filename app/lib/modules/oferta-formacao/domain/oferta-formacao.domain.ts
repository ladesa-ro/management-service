import { BaseDatedEntity } from "@/modules/@shared";
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
export class OfertaFormacao extends BaseDatedEntity implements IOfertaFormacao {
  nome!: string;
  slug!: string;
  modalidade!: IModalidade;

  protected static get entityName(): string {
    return "OfertaFormacao";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = OfertaFormacao.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.slug, "slug");
    rules.slug(this.slug, "slug");
    OfertaFormacao.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instancia valida de OfertaFormacao
   * @throws EntityValidationError se os dados forem invalidos
   */
  static criar(dados: IOfertaFormacaoCreate): OfertaFormacao {
    const instance = new OfertaFormacao();
    instance.nome = dados.nome;
    instance.slug = dados.slug;

    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstroi uma instancia a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): OfertaFormacao {
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
