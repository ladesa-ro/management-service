import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import {
  ImagemArquivoFindOneInputDto,
  ImagemArquivoFindOneOutputDto,
  ImagemArquivoListInputDto,
  ImagemArquivoListOutputDto,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de ImagemArquivo
 * Define o contrato que o service deve implementar
 */
export interface IImagemArquivoUseCasePort {
  /**
   * Lista imagens de arquivo com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @returns Lista paginada de imagens de arquivo
   */
  findAll(
    accessContext: AccessContext,
    dto: ImagemArquivoListInputDto | null,
  ): Promise<ImagemArquivoListOutputDto>;

  /**
   * Busca uma imagem de arquivo por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID da imagem de arquivo
   * @returns Imagem de arquivo encontrada ou null
   */
  findById(
    accessContext: AccessContext,
    dto: ImagemArquivoFindOneInputDto,
  ): Promise<ImagemArquivoFindOneOutputDto | null>;

  /**
   * Busca uma imagem de arquivo por ID (lança exceção se não encontrada)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID da imagem de arquivo
   * @returns Imagem de arquivo encontrada
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: ImagemArquivoFindOneInputDto,
  ): Promise<ImagemArquivoFindOneOutputDto>;
}
