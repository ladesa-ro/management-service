import type { IReadOnlyRepository } from "@/modules/@shared";
import {
  ImagemArquivoFindOneInputDto,
  ImagemArquivoFindOneOutputDto,
  ImagemArquivoListInputDto,
  ImagemArquivoListOutputDto,
} from "@/modules/armazenamento/imagem-arquivo";

/**
 * Token de injeção para o repositório de consulta de ImagemArquivo
 */
export const IImagemArquivoQueryRepository = Symbol("IImagemArquivoQueryRepository");

/**
 * Port de saída para operações de consulta de ImagemArquivo (read-only)
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IImagemArquivoQueryRepository
  extends IReadOnlyRepository<
    ImagemArquivoListInputDto,
    ImagemArquivoListOutputDto,
    ImagemArquivoFindOneInputDto,
    ImagemArquivoFindOneOutputDto
  > {}
