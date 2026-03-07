import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { NivelFormacaoCreateDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoCreateDto";
import type { NivelFormacaoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoUpdateDto";

/**
 * Entidade de Dominio: NivelFormacao
 * Implementa a tipagem INivelFormacao e adiciona regras de negocio
 */
export class NivelFormacao extends BaseDatedEntity {
  private constructor(public slug: string) {
    super();
  }

  protected static get entityName(): string {
    return "NivelFormacao";
  }

  static criar(dados: NivelFormacaoCreateDto): NivelFormacao {
    const instance = new NivelFormacao(dados.slug);
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: NivelFormacao): NivelFormacao {
    const instance = new NivelFormacao(data.slug);
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = NivelFormacao.createValidation();
    rules.required(this.slug, "slug");
    rules.slug(this.slug, "slug");
    NivelFormacao.throwIfInvalid(result);
  }

  atualizar(dados: NivelFormacaoUpdateDto): void {
    if (dados.slug !== undefined) {
      this.slug = dados.slug;
    }

    this.touchUpdated();
    this.validar();
  }
}
