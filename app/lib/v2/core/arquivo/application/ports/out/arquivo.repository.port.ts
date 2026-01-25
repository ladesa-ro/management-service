import type { SelectQueryBuilder } from "typeorm";
import type { ArquivoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export interface IArquivoRepositoryPort {
  createQueryBuilder(alias: string): SelectQueryBuilder<ArquivoEntity>;

  save(arquivo: Partial<ArquivoEntity>): Promise<ArquivoEntity>;
}
