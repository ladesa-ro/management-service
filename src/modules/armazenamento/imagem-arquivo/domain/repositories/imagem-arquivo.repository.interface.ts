import type { IRepositoryFindAll, IRepositoryFindById } from "@/domain/abstractions";
import {
  ImagemArquivoFindOneQueryResult,
  ImagemArquivoListQueryResult,
} from "@/modules/armazenamento/imagem-arquivo";

/**
 * Token de injeção para o repositório de consulta de ImagemArquivo
 */
export const IImagemArquivoQueryRepository = Symbol("IImagemArquivoQueryRepository");

/**
 * Port de saída para operações de consulta de ImagemArquivo (read-only)
 * Define o contrato que os adapters de persistência devem implementar
 */
export type IImagemArquivoQueryRepository = IRepositoryFindAll<ImagemArquivoListQueryResult> &
  IRepositoryFindById<ImagemArquivoFindOneQueryResult>;
