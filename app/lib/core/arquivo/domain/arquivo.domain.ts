import type { IArquivo, IArquivoCreate } from "./arquivo.types";

/**
 * Classe de domínio que representa um Arquivo
 */
export class Arquivo implements IArquivo {
  id!: string;
  name!: string;
  mimeType!: string;
  sizeBytes!: number;
  storageType!: string;
  dateCreated!: string;
  dateUpdated!: string;
  dateDeleted!: string | null;

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

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }
}
