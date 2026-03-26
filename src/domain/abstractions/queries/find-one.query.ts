import type { IdUuid } from "@/domain/abstractions/scalars";

/**
 * Base para query de busca por ID
 */

export class FindOneQuery {
  id!: IdUuid;
}
