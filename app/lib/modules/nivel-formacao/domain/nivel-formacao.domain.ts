import { BaseDatedEntity } from "@/modules/@shared";
import type {
  INivelFormacao,
  INivelFormacaoCreate,
  INivelFormacaoUpdate,
} from "./nivel-formacao.types";

/**
 * Entidade de Dominio: NivelFormacao
 * Implementa a tipagem INivelFormacao e adiciona regras de negocio
 */
export class NivelFormacao extends BaseDatedEntity implements INivelFormacao {
  slug!: string;

  protected static get entityName(): string {
    return "NivelFormacao";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = NivelFormacao.createValidation();
    rules.required(this.slug, "slug");
    rules.slug(this.slug, "slug");
    NivelFormacao.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instancia valida de NivelFormacao
   * @throws EntityValidationError se os dados forem invalidos
   */
  static criar(dados: INivelFormacaoCreate): NivelFormacao {
    const instance = new NivelFormacao();
    instance.slug = dados.slug;

    instance.initDates();
    instance.validar();

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
    if (dados.slug !== undefined) {
      this.slug = dados.slug;
    }

    this.touchUpdated();
    this.validar();
  }
}
