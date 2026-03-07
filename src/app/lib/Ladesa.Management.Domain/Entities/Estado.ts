import { BaseEntity, type IdNumeric } from "@/Ladesa.Management.Application/@shared";
import type { EstadoCreateDto } from "@/Ladesa.Management.Domain/Dtos/EstadoCreateDto";
import type { EstadoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/EstadoUpdateDto";

/**
 * Entidade de Domínio: Estado
 * Entidade de referência (códigos IBGE)
 */
export class Estado extends BaseEntity {
  private constructor(
    public id: IdNumeric,
    public nome: string,
    public sigla: string,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Estado";
  }

  static criar(dados: EstadoCreateDto): Estado {
    const instance = new Estado(
      dados.id,
      dados.nome?.trim() ?? "",
      dados.sigla?.trim().toUpperCase() ?? "",
    );
    instance.validar();
    return instance;
  }

  static fromData(data: Estado): Estado {
    return new Estado(data.id, data.nome, data.sigla);
  }

  validar(): void {
    const { result, rules } = Estado.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.sigla, "sigla");
    rules.custom(
      this.sigla,
      "sigla",
      (v) => /^[A-Z]{2}$/.test(v),
      "sigla deve ter 2 letras maiusculas",
      "format",
    );
    Estado.throwIfInvalid(result);
  }

  atualizar(dados: EstadoUpdateDto): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }
    if (dados.sigla !== undefined) {
      this.sigla = dados.sigla?.trim().toUpperCase() ?? "";
    }
    this.validar();
  }
}
