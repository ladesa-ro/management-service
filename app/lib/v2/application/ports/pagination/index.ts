// Re-export from core for backwards compatibility
export {
  type FilterOperator,
  type IPaginationConfig,
  type IPaginationCriteria,
  type IPaginationLinks,
  type IPaginationMeta,
  type IPaginationPort,
  type IPaginationResult,
} from "@/core/@shared";

// Re-export TypeORM-specific pagination config
export { type ITypeOrmPaginationConfig } from "@/v2/adapters/out/persistence/typeorm/types";
