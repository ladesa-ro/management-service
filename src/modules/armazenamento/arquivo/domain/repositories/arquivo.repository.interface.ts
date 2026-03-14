import type { SelectQueryBuilder } from "typeorm";
import type { ArquivoEntity } from "@/modules/armazenamento/arquivo/infrastructure/persistence/typeorm";

/**
 * Token de injeção para o repositório de Arquivo
 */
export const IArquivoRepository = Symbol("IArquivoRepository");

/**
 * Port de saída para operações de persistência de Arquivo
 */
export interface IArquivoRepository {
  createQueryBuilder(alias: string): SelectQueryBuilder<ArquivoEntity>;

  save(arquivo: Partial<ArquivoEntity>): Promise<ArquivoEntity>;
}
