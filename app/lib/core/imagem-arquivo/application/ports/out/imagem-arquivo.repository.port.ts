import {
  ImagemArquivoFindOneInput,
  ImagemArquivoFindOneOutput,
  ImagemArquivoListInput,
  ImagemArquivoListOutput,
} from "@/core/imagem-arquivo";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

/**
 * Token de injeção para o repositório de consulta de ImagemArquivo
 */
export const IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT = Symbol("IImagemArquivoQueryRepositoryPort");

/**
 * Port de saída para operações de consulta de ImagemArquivo
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IImagemArquivoQueryRepositoryPort {
  /**
   * Lista imagens de arquivo com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @returns Lista paginada de imagens de arquivo
   */
  findAll(
    accessContext: AccessContext,
    dto: ImagemArquivoListInput | null,
  ): Promise<ImagemArquivoListOutput>;

  /**
   * Busca uma imagem de arquivo por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID da imagem de arquivo
   * @returns Imagem de arquivo encontrada ou null
   */
  findById(
    accessContext: AccessContext,
    dto: ImagemArquivoFindOneInput,
  ): Promise<ImagemArquivoFindOneOutput | null>;
}
