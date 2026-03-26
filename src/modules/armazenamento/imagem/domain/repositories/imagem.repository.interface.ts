import type { PartialEntity } from "@/domain/abstractions/entities";
import type { Imagem } from "@/modules/armazenamento/imagem/domain/imagem";
import type { ImagemArquivo } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo";

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
