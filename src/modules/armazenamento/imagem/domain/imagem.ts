import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type {
  IImagemArquivo,
  ImagemArquivo,
} from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

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

  constructor(dados: { descricao?: string | null }) {
    this.id = generateUuidV7();
    this.descricao = dados.descricao?.trim() || null;
    this.versoes = [];
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result } = createValidator("Imagem");
    throwIfInvalid("Imagem", result);
  }

  static create(dados: IImagemCreate, validar: boolean = true): Imagem {
    const instance = new Imagem(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Imagem {
    const instance = Object.create(Imagem.prototype) as Imagem;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.descricao !== undefined) instance.descricao = dados.descricao;
    if (dados.versoes !== undefined) instance.versoes = dados.versoes;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IImagemUpdate): void {
    if (dados.descricao !== undefined) this.descricao = dados.descricao?.trim() || null;
    touchUpdated(this);
    this.validate();
  }

  temDescricao(): boolean {
    return this.descricao !== null && this.descricao.trim().length > 0;
  }
}
