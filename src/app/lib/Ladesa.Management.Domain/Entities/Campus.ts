import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { CampusCreateDto } from "@/Ladesa.Management.Domain/Dtos/CampusCreateDto";
import type { CampusUpdateDto } from "@/Ladesa.Management.Domain/Dtos/CampusUpdateDto";

/**
 * Entidade de Domínio: Campus
 * Implementa a tipagem ICampus e adiciona regras de negócio
 */
export class Campus extends BaseDatedEntity {
  private constructor(
    public nomeFantasia: string,
    public razaoSocial: string,
    public apelido: string,
    public cnpj: string,
    public enderecoId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Campus";
  }

  static criar(dados: CampusCreateDto, enderecoId: IdUuid): Campus {
    const instance = new Campus(
      dados.nomeFantasia?.trim() ?? "",
      dados.razaoSocial?.trim() ?? "",
      dados.apelido?.trim() || "",
      dados.cnpj,
      enderecoId,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Campus): Campus {
    const instance = new Campus(
      data.nomeFantasia,
      data.razaoSocial,
      data.apelido,
      data.cnpj,
      data.enderecoId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = Campus.createValidation();
    rules.required(this.nomeFantasia, "nomeFantasia");
    rules.minLength(this.nomeFantasia, "nomeFantasia", 1);
    rules.required(this.razaoSocial, "razaoSocial");
    rules.minLength(this.razaoSocial, "razaoSocial", 1);
    Campus.throwIfInvalid(result);
  }

  atualizar(dados: CampusUpdateDto): void {
    if (dados.nomeFantasia !== undefined) {
      this.nomeFantasia = dados.nomeFantasia?.trim() ?? "";
    }

    if (dados.razaoSocial !== undefined) {
      this.razaoSocial = dados.razaoSocial?.trim() ?? "";
    }

    if (dados.apelido !== undefined) {
      this.apelido = dados.apelido?.trim() || "";
    }

    if (dados.cnpj !== undefined) {
      this.cnpj = dados.cnpj;
    }

    this.touchUpdated();
    this.validar();
  }

  isCnpjValido(): boolean {
    const cnpjLimpo = this.cnpj.replace(/\D/g, "");
    return /^\d{14}$/.test(cnpjLimpo);
  }
}
