import type { IReadOnlyRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import {
  ImagemArquivoFindOneInputDto,
  ImagemArquivoFindOneOutputDto,
  ImagemArquivoListInputDto,
  ImagemArquivoListOutputDto,
} from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo";

/**
 * Token de injeção para o repositório de consulta de ImagemArquivo
 */
export const IImagemArquivoQueryRepository = Symbol("IImagemArquivoQueryRepository");

/**
 * Port de saída para operações de consulta de ImagemArquivo (read-only)
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IImagemArquivoQueryRepository
  extends IReadOnlyRepositoryPort<
    ImagemArquivoListInputDto,
    ImagemArquivoListOutputDto,
    ImagemArquivoFindOneInputDto,
    ImagemArquivoFindOneOutputDto
  > {}
