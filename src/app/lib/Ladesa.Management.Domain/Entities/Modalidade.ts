import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ModalidadeCreateDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeCreateDto";
import type { ModalidadeUpdateDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeUpdateDto";

/**
 * Tipagem da entidade Modalidade
 * Define a estrutura de dados sem comportamento
 */
export interface IModalidade extends IEntityBase {
  /** Nome da modalidade */
  nome: string;

  /** Slug para URL amigavel */
  slug: string;
}

/**
 * Entidade de Dominio: Modalidade
 * Implementa a tipagem IModalidade e adiciona regras de negocio
 */
export class Modalidade extends BaseDatedEntity implements IModalidade {
  nome!: string;
  slug!: string;

  protected static get entityName(): string {
    return "Modalidade";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Cria uma nova instancia valida de Modalidade
   * @throws EntityValidationError se os dados forem invalidos
   */
  static criar(dados: ModalidadeCreateDto): Modalidade {
    const instance = new Modalidade();
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
  static fromData(dados: Record<string, any>): Modalidade {
    const instance = new Modalidade();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = Modalidade.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.slug, "slug");
    rules.slug(this.slug, "slug");
    Modalidade.throwIfInvalid(result);
  }

  // ========================================
  // Metodos de Dominio
  // ========================================

  /**
   * Atualiza os dados da modalidade
   * @throws EntityValidationError se os dados forem invalidos
   */
  atualizar(dados: ModalidadeUpdateDto): void {
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
