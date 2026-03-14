import type { PartialEntity } from "@/modules/@shared";
import type { Imagem } from "@/modules/armazenamento/imagem/domain/imagem.domain";
import type { ImagemArquivo } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo.domain";

/**
 * Token de injecao para o repositorio de Imagem
 */
export const IMAGEM_REPOSITORY_PORT = Symbol("IImagemRepositoryPort");

/**
 * Port de saida para operacoes de persistencia de Imagem
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IImagemRepositoryPort {
  create(): Imagem;
  merge(entity: Imagem, data: PartialEntity<Imagem>): void;
  save(entity: PartialEntity<Imagem>): Promise<Imagem>;
}

/**
 * Token de injecao para o repositorio de ImagemArquivo
 */
export const IMAGEM_ARQUIVO_REPOSITORY_PORT = Symbol("IImagemArquivoRepositoryPort");

/**
 * Port de saida para operacoes de persistencia de ImagemArquivo
 */
export interface IImagemArquivoRepositoryPort {
  create(): ImagemArquivo;

  merge(imagemArquivo: ImagemArquivo, data: PartialEntity<ImagemArquivo>): void;

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
