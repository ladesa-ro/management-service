import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
} from "@/domain/abstractions";
import type {
  ImagemArquivoFindOneQuery,
  ImagemArquivoFindOneQueryResult,
  ImagemArquivoListQuery,
  ImagemArquivoListQueryResult,
} from "@/modules/armazenamento/imagem-arquivo";

/**
 * Token de injeção para o repositório de consulta de ImagemArquivo
 */
export const IImagemArquivoQueryRepository = Symbol("IImagemArquivoQueryRepository");

/**
 * Port de saída para operações de consulta de ImagemArquivo (read-only).
 */
export interface IImagemArquivoQueryRepository {
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    ImagemArquivoFindOneQuery,
    ImagemArquivoFindOneQueryResult
  >;
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    ImagemArquivoListQuery,
    ImagemArquivoListQueryResult
  >;
}
