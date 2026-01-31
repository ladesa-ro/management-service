import type { IReadOnlyRepositoryPort } from "@/modules/@shared";
import {
  ImagemArquivoFindOneInput,
  ImagemArquivoFindOneOutput,
  ImagemArquivoListInput,
  ImagemArquivoListOutput,
} from "@/modules/imagem-arquivo";

/**
 * Token de injeção para o repositório de consulta de ImagemArquivo
 */
export const IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT = Symbol("IImagemArquivoQueryRepositoryPort");

/**
 * Port de saída para operações de consulta de ImagemArquivo (read-only)
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IImagemArquivoQueryRepositoryPort
  extends IReadOnlyRepositoryPort<
    ImagemArquivoListInput,
    ImagemArquivoListOutput,
    ImagemArquivoFindOneInput,
    ImagemArquivoFindOneOutput
  > {}
