import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { type Arquivo, type IArquivo } from "@/modules/armazenamento/arquivo/domain/arquivo";
import { type IImagem, type Imagem } from "@/modules/armazenamento/imagem/domain/imagem";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  ImagemArquivoCreateSchema,
  ImagemArquivoSchema,
  ImagemArquivoUpdateSchema,
} from "./imagem-arquivo.schemas";

interface IImagemArquivoLoadInput {
  imagem?: Imagem;
  arquivo?: Arquivo;
  [key: string]: unknown;
}

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

  private constructor() {}

  static create(dados: IImagemArquivoCreate): ImagemArquivo {
    const parsed = zodValidate(ImagemArquivo.entityName, ImagemArquivoCreateSchema.domain, dados);

    const instance = new ImagemArquivo();

    instance.id = generateUuidV7();
    instance.largura = parsed.largura;
    instance.altura = parsed.altura;
    instance.formato = parsed.formato;
    instance.mimeType = parsed.mimeType;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: IImagemArquivoLoadInput): ImagemArquivo {
    const parsed = zodValidate(ImagemArquivo.entityName, ImagemArquivoSchema, dados);

    const instance = new ImagemArquivo();

    instance.id = parsed.id;
    instance.largura = parsed.largura;
    instance.altura = parsed.altura;
    instance.formato = parsed.formato;
    instance.mimeType = parsed.mimeType;
    instance.imagem = dados.imagem!;
    instance.arquivo = dados.arquivo!;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(ImagemArquivo.entityName, ImagemArquivoUpdateSchema.domain, dados);

    if (parsed.largura !== undefined) this.largura = parsed.largura;
    if (parsed.altura !== undefined) this.altura = parsed.altura;
    if (parsed.formato !== undefined) this.formato = parsed.formato;
    if (parsed.mimeType !== undefined) this.mimeType = parsed.mimeType;

    this.dateUpdated = getNowISO();
    zodValidate(ImagemArquivo.entityName, ImagemArquivoSchema, this);
  }
}
