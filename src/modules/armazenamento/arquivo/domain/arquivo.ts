import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { ArquivoCreateSchema, ArquivoSchema, ArquivoUpdateSchema } from "./arquivo.schemas";

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

  private constructor() {}

  static create(dados: IArquivoCreate): Arquivo {
    const parsed = zodValidate(Arquivo.entityName, ArquivoCreateSchema, dados);

    const instance = new Arquivo();

    instance.id = generateUuidV7();
    instance.name = parsed.name;
    instance.mimeType = parsed.mimeType;
    instance.sizeBytes = parsed.sizeBytes;
    instance.storageType = parsed.storageType;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Arquivo {
    const parsed = zodValidate(Arquivo.entityName, ArquivoSchema, dados);

    const instance = new Arquivo();

    instance.id = parsed.id;
    instance.name = parsed.name;
    instance.mimeType = parsed.mimeType;
    instance.sizeBytes = parsed.sizeBytes;
    instance.storageType = parsed.storageType;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Arquivo.entityName, ArquivoUpdateSchema, dados);

    if (parsed.name !== undefined) this.name = parsed.name;
    if (parsed.mimeType !== undefined) this.mimeType = parsed.mimeType;
    if (parsed.sizeBytes !== undefined) this.sizeBytes = parsed.sizeBytes;
    if (parsed.storageType !== undefined) this.storageType = parsed.storageType;

    this.dateUpdated = getNowISO();
    zodValidate(Arquivo.entityName, ArquivoSchema, this);
  }
}
