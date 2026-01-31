import type { FilterOperator } from "nestjs-paginate";
import type { FindOptionsRelations } from "typeorm";
import type { IPaginationConfig } from "@/core/@shared";

/**
 * Configuração de paginação estendida para TypeORM
 * Adiciona suporte a relations do TypeORM e FilterOperator do nestjs-paginate
 */
export interface ITypeOrmPaginationConfig<T> extends IPaginationConfig {
  /** Relações a serem carregadas (formato TypeORM FindOptionsRelations) */
  relations?: FindOptionsRelations<T>;

  /** Colunas que podem ser filtradas (sobrescreve para usar FilterOperator do nestjs-paginate) */
  filterableColumns?: {
    [key: string]: (FilterOperator | string)[] | true;
  };
}
