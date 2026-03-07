import { BaseEntity, type IdNumeric } from "@/Ladesa.Management.Application/@shared";
import type { CidadeCreateDto } from "@/Ladesa.Management.Domain/Dtos/CidadeCreateDto";
import type { CidadeUpdateDto } from "@/Ladesa.Management.Domain/Dtos/CidadeUpdateDto";

/**
 * Entidade de Domínio: Cidade
 * Entidade de referência (códigos IBGE)
 */
export class Cidade extends BaseEntity {
  private constructor(
    public id: IdNumeric,
    public nome: string,
    public estadoId: IdNumeric,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Cidade";
  }

  static criar(dados: CidadeCreateDto): Cidade {
    const instance = new Cidade(dados.id, dados.nome?.trim() ?? "", dados.estado.id);
    instance.validar();
    return instance;
  }

  static fromData(data: Cidade): Cidade {
    return new Cidade(data.id, data.nome, data.estadoId);
  }

  validar(): void {
    const { result, rules } = Cidade.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    Cidade.throwIfInvalid(result);
  }

  atualizar(dados: CidadeUpdateDto): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }
    this.validar();
  }
}
