import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { IModalidade } from "@/Ladesa.Management.Application/ensino/modalidade";
import type { OfertaFormacaoCreateDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoCreateDto";
import type { OfertaFormacaoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoUpdateDto";

/**
 * Interface que define a estrutura de dados de OfertaFormacao
 * Tipagem pura sem implementacao de regras
 */
export interface IOfertaFormacao extends IEntityBase {
  /** Nome da oferta de formacao */
  nome: string;

  /** Slug para URL amigavel */
  slug: string;

  /** Modalidade associada */
  modalidade: IModalidade | null;
}

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

  /**
   * Cria uma nova instancia valida de OfertaFormacao
   * @throws EntityValidationError se os dados forem invalidos
   */
  static criar(dados: OfertaFormacaoCreateDto): OfertaFormacao {
    const instance = new OfertaFormacao();
    instance.nome = dados.nome;
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
  static fromData(dados: Record<string, any>): OfertaFormacao {
    const instance = new OfertaFormacao();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = OfertaFormacao.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.slug, "slug");
    rules.slug(this.slug, "slug");
    OfertaFormacao.throwIfInvalid(result);
  }

  // ========================================
  // Metodos de Dominio
  // ========================================

  /**
   * Atualiza os dados da oferta de formacao
   * @throws EntityValidationError se os dados forem invalidos
   */
  atualizar(dados: OfertaFormacaoUpdateDto): void {
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
