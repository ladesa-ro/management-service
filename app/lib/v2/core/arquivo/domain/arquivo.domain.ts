import type { IArquivo, IArquivoCreate } from "./arquivo.types";

/**
 * Classe de domínio que representa um Arquivo
 * Implementa a interface IArquivo
 */
export class Arquivo implements IArquivo {
  id!: string;
  name!: string;
  mimeType!: string;
  sizeBytes!: number;
  storageType!: string;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  /**
   * Cria uma nova instância de Arquivo
   */
  static criar(dados: IArquivoCreate): Arquivo {
    const arquivo = new Arquivo();
    arquivo.name = dados.name;
    arquivo.mimeType = dados.mimeType;
    arquivo.sizeBytes = dados.sizeBytes;
    arquivo.storageType = dados.storageType;
    return arquivo;
  }

  /**
   * Cria uma instância a partir de dados existentes
   */
  static fromData(dados: IArquivo): Arquivo {
    const arquivo = new Arquivo();
    Object.assign(arquivo, dados);
    return arquivo;
  }

  /**
   * Verifica se o arquivo está ativo (não deletado)
   */
  isAtivo(): boolean {
    return this.dateDeleted === null;
  }
}
