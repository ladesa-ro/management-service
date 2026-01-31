import { BaseEntity, type ScalarDateTimeString } from "@/core/@shared";
import type { Arquivo } from "@/core/arquivo/domain/arquivo.domain";
import type { Imagem } from "@/core/imagem/domain/imagem.domain";
import type { IImagemArquivo, IImagemArquivoCreate } from "./imagem-arquivo.types";

/**
 * Classe de domínio que representa um ImagemArquivo
 * Implementa a interface IImagemArquivo
 */
export class ImagemArquivo extends BaseEntity implements IImagemArquivo {
  id!: string;
  largura!: number;
  altura!: number;
  formato!: string;
  mimeType!: string;
  imagem!: Imagem;
  arquivo!: Arquivo;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  /**
   * Cria uma nova instância de ImagemArquivo
   */
  static criar(dados: IImagemArquivoCreate): ImagemArquivo {
    const imagemArquivo = new ImagemArquivo();
    imagemArquivo.largura = dados.largura;
    imagemArquivo.altura = dados.altura;
    imagemArquivo.formato = dados.formato;
    imagemArquivo.mimeType = dados.mimeType;
    return imagemArquivo;
  }

  /**
   * Cria uma instância a partir de dados existentes
   */
  static fromData(dados: IImagemArquivo): ImagemArquivo {
    const imagemArquivo = new ImagemArquivo();
    Object.assign(imagemArquivo, dados);
    return imagemArquivo;
  }

}
