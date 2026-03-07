import type { PartialEntity } from "@/Ladesa.Management.Application/@shared";
import type { Imagem } from "@/Ladesa.Management.Domain/Entities/Imagem";
import type { ImagemArquivo } from "@/Ladesa.Management.Domain/Entities/ImagemArquivo";

/**
 * Token de injecao para o repositorio de Imagem
 */
export const IImagemRepository = Symbol("IImagemRepository");

/**
 * Port de saida para operacoes de persistencia de Imagem
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IImagemRepository {
  create(): Imagem;
  merge(entity: Imagem, data: PartialEntity<Imagem>): void;
  save(entity: PartialEntity<Imagem>): Promise<Imagem>;
}

/**
 * Token de injecao para o repositorio de ImagemArquivo
 */
export const IImagemArquivoRepository = Symbol("IImagemArquivoRepository");

/**
 * Port de saida para operacoes de persistencia de ImagemArquivo
 */
export interface IImagemArquivoRepository {
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
export const IImagemTransaction = Symbol("IImagemTransaction");

/**
 * Port de saida para operacoes de transacao de Imagem
 */
export interface IImagemTransaction {
  transaction<T>(
    callback: (context: {
      imagemRepository: IImagemRepository;
      imagemArquivoRepository: IImagemArquivoRepository;
    }) => Promise<T>,
  ): Promise<T>;
}
