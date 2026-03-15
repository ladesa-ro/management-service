import type { IdUuid } from "@/modules/@shared";

/**
 * Base para query de busca por ID
 */
export class FindOneQuery {
  id!: IdUuid;
  selection?: string[] | boolean;
}
