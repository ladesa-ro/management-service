// Base repository adapter
export * from "./base-repository.adapter";

// Repository factory utilities
export * from "./create-repository-factory";

// NOTE: entities.ts is NOT re-exported here to avoid loading all 35 entities
// when importing unrelated utilities. Import directly from entities.ts if needed.

// Metadata registry for QbEfficientLoad
export * from "./metadata";

// Pagination adapter and config
export * from "./pagination";
// Pagination types
export * from "./pagination-config.types";
// Query builder utilities
export * from "./qb-efficient-load";
// Legacy search service (deprecated - use NestJsPaginateAdapter)
export * from "./search";
// Transaction module
export * from "./transaction";
// TypeORM module and providers
export * from "./typeorm.module";
export * from "./typeorm.providers";
export * from "./typeorm.service";
