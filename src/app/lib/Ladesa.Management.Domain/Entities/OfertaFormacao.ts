import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { OfertaFormacaoCreateDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoCreateDto";
import type { OfertaFormacaoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoUpdateDto";

/**
 * Entidade de Dominio: OfertaFormacao
 * Implementa a tipagem IOfertaFormacao e adiciona regras de negocio
 */
export class OfertaFormacao extends BaseDatedEntity {
  private constructor(
    public nome: string,
    public slug: string,
    public modalidadeId: IdUuid | null,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "OfertaFormacao";
  }

  static criar(dados: OfertaFormacaoCreateDto): OfertaFormacao {
    const instance = new OfertaFormacao(dados.nome, dados.slug, dados.modalidade?.id ?? null);
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: OfertaFormacao): OfertaFormacao {
    const instance = new OfertaFormacao(data.nome, data.slug, data.modalidadeId);
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
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
