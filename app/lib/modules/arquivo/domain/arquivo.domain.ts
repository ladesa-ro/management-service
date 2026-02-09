import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { IArquivo, IArquivoCreate, IArquivoUpdate } from "./arquivo.types";

/**
 * Entidade de Domínio: Arquivo
 * Implementa a tipagem IArquivo e adiciona regras de negócio
 */
export class Arquivo extends BaseEntity implements IArquivo {
  id!: IdUuid;
  name!: string;
  mimeType!: string;
  sizeBytes!: number;
  storageType!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Arquivo";
  }

  // ========================================
  // Validação
  // ========================================

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

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Arquivo
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IArquivoCreate): Arquivo {
    const instance = new Arquivo();
    instance.name = dados.name?.trim() ?? "";
    instance.mimeType = dados.mimeType?.trim() ?? "";
    instance.sizeBytes = dados.sizeBytes;
    instance.storageType = dados.storageType;
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IArquivo): Arquivo {
    const instance = new Arquivo();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do arquivo
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IArquivoUpdate): void {
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
