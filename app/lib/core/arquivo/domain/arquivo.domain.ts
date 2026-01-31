import { BaseEntity, type ScalarDateTimeString } from "@/core/@shared";
import type { IArquivo, IArquivoCreate } from "./arquivo.types";

/**
 * Classe de domínio que representa um Arquivo
 */
export class Arquivo extends BaseEntity implements IArquivo {
  id!: string;
  name!: string;
  mimeType!: string;
  sizeBytes!: number;
  storageType!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  static criar(dados: IArquivoCreate): Arquivo {
    const arquivo = new Arquivo();
    arquivo.name = dados.name;
    arquivo.mimeType = dados.mimeType;
    arquivo.sizeBytes = dados.sizeBytes;
    arquivo.storageType = dados.storageType;
    return arquivo;
  }

  static fromData(dados: IArquivo): Arquivo {
    const arquivo = new Arquivo();
    Object.assign(arquivo, dados);
    return arquivo;
  }
}
