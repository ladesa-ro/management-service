import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type {
  IImagemArquivo,
  ImagemArquivo,
} from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { ImagemCreateSchema, ImagemSchema, ImagemUpdateSchema } from "./imagem.schemas";

interface IImagemLoadInput {
  versoes?: ImagemArquivo[];
  [key: string]: unknown;
}

export interface IImagem extends IEntityBaseUuid {
  descricao: string | null;
  versoes?: IImagemArquivo[];
}

export interface IImagemCreate {
  descricao?: string | null;
}

export interface IImagemUpdate {
  descricao?: string | null;
}

export class Imagem implements IEntityBaseUuid {
  static readonly entityName = "Imagem";

  id!: IdUuid;
  descricao!: string | null;
  versoes!: ImagemArquivo[];
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: IImagemCreate): Imagem {
    const parsed = zodValidate(Imagem.entityName, ImagemCreateSchema, dados);

    const instance = new Imagem();

    instance.id = generateUuidV7();
    instance.descricao = parsed.descricao?.trim() || null;
    instance.versoes = [];
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: IImagemLoadInput): Imagem {
    const parsed = zodValidate(Imagem.entityName, ImagemSchema, dados);

    const instance = new Imagem();

    instance.id = parsed.id;
    instance.descricao = parsed.descricao;
    instance.versoes = dados.versoes ?? [];
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Imagem.entityName, ImagemUpdateSchema, dados);

    if (parsed.descricao !== undefined) this.descricao = parsed.descricao?.trim() || null;

    this.dateUpdated = getNowISO();
    zodValidate(Imagem.entityName, ImagemSchema, this);
  }

  temDescricao(): boolean {
    return this.descricao !== null && this.descricao.trim().length > 0;
  }
}
