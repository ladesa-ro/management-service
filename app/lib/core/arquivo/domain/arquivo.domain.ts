import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/core/@shared";
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
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Arquivo
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IArquivoCreate): Arquivo {
    const { result, rules } = this.createValidation();

    const instance = new Arquivo();
    instance.name = rules.required(dados.name, "name");
    instance.mimeType = rules.required(dados.mimeType, "mimeType");
    instance.sizeBytes = rules.requiredNumber(dados.sizeBytes, "sizeBytes");
    instance.sizeBytes = rules.min(instance.sizeBytes, "sizeBytes", 0);
    instance.storageType = rules.required(dados.storageType, "storageType");

    this.throwIfInvalid(result);

    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

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
    const { result, rules } = Arquivo.createValidation();

    if (dados.name !== undefined) {
      this.name = rules.required(dados.name, "name");
    }

    if (dados.mimeType !== undefined) {
      this.mimeType = rules.required(dados.mimeType, "mimeType");
    }

    if (dados.sizeBytes !== undefined) {
      this.sizeBytes = rules.requiredNumber(dados.sizeBytes, "sizeBytes");
      this.sizeBytes = rules.min(this.sizeBytes, "sizeBytes", 0);
    }

    if (dados.storageType !== undefined) {
      this.storageType = rules.required(dados.storageType, "storageType");
    }

    Arquivo.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }
}
