/**
 * Token de injeção para o repositório de Arquivo
 */
export const IArquivoRepository = Symbol("IArquivoRepository");

/**
 * Port de saída para operações de persistência de Arquivo
 *
 * NOTE: createQueryBuilder returns `any` because it is a leaky TypeORM abstraction
 * that will be refactored into domain-safe query methods in a future iteration.
 */
export interface IArquivoRepository {
  // NOTE: returns `any` because this is a leaky TypeORM abstraction (known tech debt)
  createQueryBuilder(alias: string): any;

  save(
    arquivo: Partial<{
      id: string;
      name: string;
      mimeType: string;
      sizeBytes: number;
      storageType: string;
    }>,
  ): Promise<{
    id: string;
    name: string;
    mimeType: string;
    sizeBytes: number;
    storageType: string;
  }>;
}
