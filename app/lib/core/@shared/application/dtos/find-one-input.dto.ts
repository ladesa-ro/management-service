import type { IdUuid } from "@/core/@shared";

/**
 * DTO base para entrada de busca por ID
 */
export class FindOneInput {
  id!: IdUuid;
  selection?: string[];
}
