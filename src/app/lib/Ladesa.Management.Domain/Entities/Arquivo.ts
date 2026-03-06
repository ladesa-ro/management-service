import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ArquivoCreateDto } from "@/Ladesa.Management.Domain/Dtos/ArquivoCreateDto";
import type { ArquivoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/ArquivoUpdateDto";

/**
 * Interface que define a estrutura de um Arquivo
 */
export interface IArquivo extends IEntityBase {
  name: string;
  mimeType: string;
  sizeBytes: number;
  storageType: string;
}

/**
 * Entidade de Domínio: Arquivo
 * Implementa a tipagem IArquivo e adiciona regras de negócio
 */
export class Arquivo extends BaseDatedEntity implements IArquivo {
  name!: string;
  mimeType!: string;
  sizeBytes!: number;
  storageType!: string;

  protected static get entityName(): string {
    return "Arquivo";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Cria uma nova instância válida de Arquivo
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: ArquivoCreateDto): Arquivo {
    const instance = new Arquivo();
    instance.name = dados.name?.trim() ?? "";
    instance.mimeType = dados.mimeType?.trim() ?? "";
    instance.sizeBytes = dados.sizeBytes;
    instance.storageType = dados.storageType;
    instance.initDates();
    instance.validar();

    return instance;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Arquivo {
    const instance = new Arquivo();
    Object.assign(instance, dados);
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

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do arquivo
   * @throws EntityValidationError se os dados forem inválidos
   */
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
