import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { NivelFormacaoCreateDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoCreateDto";
import type { NivelFormacaoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoUpdateDto";

/**
 * Tipagem da entidade NivelFormacao
 * Define a estrutura de dados sem comportamento
 */
export interface INivelFormacao extends IEntityBase {
  /** Slug para identificacao (ex: tecnico, graduacao, pos-graduacao) */
  slug: string;
}

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

  /**
   * Cria uma nova instancia valida de NivelFormacao
   * @throws EntityValidationError se os dados forem invalidos
   */
  static criar(dados: NivelFormacaoCreateDto): NivelFormacao {
    const instance = new NivelFormacao();
    instance.slug = dados.slug;

    instance.initDates();
    instance.validar();

    return instance;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstroi uma instancia a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): NivelFormacao {
    const instance = new NivelFormacao();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = NivelFormacao.createValidation();
    rules.required(this.slug, "slug");
    rules.slug(this.slug, "slug");
    NivelFormacao.throwIfInvalid(result);
  }

  // ========================================
  // Metodos de Dominio
  // ========================================

  /**
   * Atualiza os dados do nivel de formacao
   * @throws EntityValidationError se os dados forem invalidos
   */
  atualizar(dados: NivelFormacaoUpdateDto): void {
    if (dados.slug !== undefined) {
      this.slug = dados.slug;
    }

    this.touchUpdated();
    this.validar();
  }
}
