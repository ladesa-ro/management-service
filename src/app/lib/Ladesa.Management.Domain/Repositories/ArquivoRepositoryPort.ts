import type { SelectQueryBuilder } from "typeorm";
import type { ArquivoEntity } from "@/Ladesa.Management.Application/armazenamento/arquivo/infrastructure/persistence/typeorm";

/**
 * Token de injeção para o repositório de Arquivo
 */
export const ARQUIVO_REPOSITORY_PORT = Symbol("IArquivoRepositoryPort");

/**
 * Port de saída para operações de persistência de Arquivo
 */
export interface IArquivoRepositoryPort {
  createQueryBuilder(alias: string): SelectQueryBuilder<ArquivoEntity>;

  save(arquivo: Partial<ArquivoEntity>): Promise<ArquivoEntity>;
}
