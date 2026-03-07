import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ModalidadeCreateDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeCreateDto";
import type { ModalidadeUpdateDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeUpdateDto";

/**
 * Entidade de Dominio: Modalidade
 * Implementa a tipagem IModalidade e adiciona regras de negocio
 */
export class Modalidade extends BaseDatedEntity {
  private constructor(
    public nome: string,
    public slug: string,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Modalidade";
  }

  static criar(dados: ModalidadeCreateDto): Modalidade {
    const instance = new Modalidade(dados.nome, dados.slug);
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Modalidade): Modalidade {
    const instance = new Modalidade(data.nome, data.slug);
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
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
