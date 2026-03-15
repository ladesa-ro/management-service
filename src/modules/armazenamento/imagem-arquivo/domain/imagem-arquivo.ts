import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { type Arquivo, type IArquivo } from "@/modules/armazenamento/arquivo/domain/arquivo";
import { type IImagem, type Imagem } from "@/modules/armazenamento/imagem/domain/imagem";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface IImagemArquivo extends IEntityBaseUuid {
  largura: number;
  altura: number;
  formato: string;
  mimeType: string;
  imagem: IImagem;
  arquivo: IArquivo;
}

export interface IImagemArquivoCreate {
  largura: number;
  altura: number;
  formato: string;
  mimeType: string;
  imagem: { id: IdUuid };
  arquivo: { id: IdUuid };
}

export interface IImagemArquivoUpdate {
  largura?: number;
  altura?: number;
  formato?: string;
  mimeType?: string;
}

export class ImagemArquivo implements IEntityBaseUuid {
  static readonly entityName = "ImagemArquivo";

  id!: IdUuid;
  largura!: number;
  altura!: number;
  formato!: string;
  mimeType!: string;
  imagem!: Imagem;
  arquivo!: Arquivo;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { largura: number; altura: number; formato: string; mimeType: string }) {
    this.id = generateUuidV7();
    this.largura = dados.largura;
    this.altura = dados.altura;
    this.formato = dados.formato;
    this.mimeType = dados.mimeType;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("ImagemArquivo");
    rules.requiredNumber(this.largura, "largura");
    rules.min(this.largura, "largura", 1);
    rules.requiredNumber(this.altura, "altura");
    rules.min(this.altura, "altura", 1);
    rules.required(this.formato, "formato");
    rules.required(this.mimeType, "mimeType");
    throwIfInvalid("ImagemArquivo", result);
  }

  static create(dados: IImagemArquivoCreate, validar: boolean = true): ImagemArquivo {
    const instance = new ImagemArquivo(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): ImagemArquivo {
    const instance = Object.create(ImagemArquivo.prototype) as ImagemArquivo;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.largura !== undefined) instance.largura = dados.largura;
    if (dados.altura !== undefined) instance.altura = dados.altura;
    if (dados.formato !== undefined) instance.formato = dados.formato;
    if (dados.mimeType !== undefined) instance.mimeType = dados.mimeType;
    if (dados.imagem !== undefined) instance.imagem = dados.imagem;
    if (dados.arquivo !== undefined) instance.arquivo = dados.arquivo;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IImagemArquivoUpdate): void {
    if (dados.largura !== undefined) this.largura = dados.largura;
    if (dados.altura !== undefined) this.altura = dados.altura;
    if (dados.formato !== undefined) this.formato = dados.formato;
    if (dados.mimeType !== undefined) this.mimeType = dados.mimeType;
    touchUpdated(this);
    this.validate();
  }
}
