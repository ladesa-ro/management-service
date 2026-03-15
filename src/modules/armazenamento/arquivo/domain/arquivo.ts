import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface IArquivo extends IEntityBaseUuid {
  name: string;
  mimeType: string;
  sizeBytes: number;
  storageType: string;
}

export interface IArquivoCreate {
  name: string;
  mimeType: string;
  sizeBytes: number;
  storageType: string;
}

export interface IArquivoUpdate {
  name?: string;
  mimeType?: string;
  sizeBytes?: number;
  storageType?: string;
}

export class Arquivo implements IEntityBaseUuid {
  static readonly entityName = "Arquivo";

  id!: IdUuid;
  name!: string;
  mimeType!: string;
  sizeBytes!: number;
  storageType!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { name: string; mimeType: string; sizeBytes: number; storageType: string }) {
    this.id = generateUuidV7();
    this.name = dados.name;
    this.mimeType = dados.mimeType;
    this.sizeBytes = dados.sizeBytes;
    this.storageType = dados.storageType;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("Arquivo");
    rules.required(this.name, "name");
    rules.minLength(this.name, "name", 1);
    rules.required(this.mimeType, "mimeType");
    rules.requiredNumber(this.sizeBytes, "sizeBytes");
    rules.min(this.sizeBytes, "sizeBytes", 0);
    rules.required(this.storageType, "storageType");
    throwIfInvalid("Arquivo", result);
  }

  static create(dados: IArquivoCreate, validar: boolean = true): Arquivo {
    const instance = new Arquivo(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Arquivo {
    const instance = Object.create(Arquivo.prototype) as Arquivo;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.name !== undefined) instance.name = dados.name;
    if (dados.mimeType !== undefined) instance.mimeType = dados.mimeType;
    if (dados.sizeBytes !== undefined) instance.sizeBytes = dados.sizeBytes;
    if (dados.storageType !== undefined) instance.storageType = dados.storageType;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IArquivoUpdate): void {
    if (dados.name !== undefined) this.name = dados.name;
    if (dados.mimeType !== undefined) this.mimeType = dados.mimeType;
    if (dados.sizeBytes !== undefined) this.sizeBytes = dados.sizeBytes;
    if (dados.storageType !== undefined) this.storageType = dados.storageType;
    touchUpdated(this);
    this.validate();
  }
}
