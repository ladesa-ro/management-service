import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ArquivoCreateDto } from "@/Ladesa.Management.Domain/Dtos/ArquivoCreateDto";
import type { ArquivoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/ArquivoUpdateDto";

/**
 * Entidade de Domínio: Arquivo
 * Implementa a tipagem IArquivo e adiciona regras de negócio
 */
export class Arquivo extends BaseDatedEntity {
  private constructor(
    public name: string,
    public mimeType: string,
    public sizeBytes: number,
    public storageType: string,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Arquivo";
  }

  static criar(dados: ArquivoCreateDto): Arquivo {
    const instance = new Arquivo(
      dados.name?.trim() ?? "",
      dados.mimeType?.trim() ?? "",
      dados.sizeBytes,
      dados.storageType,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Arquivo): Arquivo {
    const instance = new Arquivo(data.name, data.mimeType, data.sizeBytes, data.storageType);
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = Arquivo.createValidation();
    rules.required(this.name, "name");
    rules.minLength(this.name, "name", 1);
    rules.required(this.mimeType, "mimeType");
    rules.requiredNumber(this.sizeBytes, "sizeBytes");
    rules.min(this.sizeBytes, "sizeBytes", 0);
    rules.required(this.storageType, "storageType");
    Arquivo.throwIfInvalid(result);
  }

  atualizar(dados: ArquivoUpdateDto): void {
    if (dados.name !== undefined) {
      this.name = dados.name?.trim() ?? "";
    }

    if (dados.mimeType !== undefined) {
      this.mimeType = dados.mimeType?.trim() ?? "";
    }

    if (dados.sizeBytes !== undefined) {
      this.sizeBytes = dados.sizeBytes;
    }

    if (dados.storageType !== undefined) {
      this.storageType = dados.storageType;
    }

    this.touchUpdated();
    this.validar();
  }
}
