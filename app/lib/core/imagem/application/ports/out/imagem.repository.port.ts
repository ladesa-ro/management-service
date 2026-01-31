import type { DeepPartial } from "typeorm";
import type {
  ImagemArquivoEntity,
  ImagemEntity,
} from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

/**
 * Token de injecao para o repositorio de Imagem
 */
export const IMAGEM_REPOSITORY_PORT = Symbol("IImagemRepositoryPort");

/**
 * Port de saida para operacoes de persistencia de Imagem
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IImagemRepositoryPort {
  create(): ImagemEntity;

  merge(imagem: ImagemEntity, data: DeepPartial<ImagemEntity>): void;

  save(imagem: ImagemEntity): Promise<ImagemEntity>;
}

/**
 * Token de injecao para o repositorio de ImagemArquivo
 */
export const IMAGEM_ARQUIVO_REPOSITORY_PORT = Symbol("IImagemArquivoRepositoryPort");

/**
 * Port de saida para operacoes de persistencia de ImagemArquivo
 */
export interface IImagemArquivoRepositoryPort {
  create(): ImagemArquivoEntity;

  merge(imagemArquivo: ImagemArquivoEntity, data: DeepPartial<ImagemArquivoEntity>): void;

  /**
   * Busca o ID do arquivo mais recente para uma imagem
   */
  findLatestArquivoIdForImagem(imagemId: string): Promise<string | null>;
}

/**
 * Token de injecao para a porta de transacao de Imagem
 */
export const IMAGEM_TRANSACTION_PORT = Symbol("IImagemTransactionPort");

/**
 * Port de saida para operacoes de transacao de Imagem
 */
export interface IImagemTransactionPort {
  transaction<T>(
    callback: (context: {
      imagemRepository: IImagemRepositoryPort;
      imagemArquivoRepository: IImagemArquivoRepositoryPort;
    }) => Promise<T>,
  ): Promise<T>;
}
