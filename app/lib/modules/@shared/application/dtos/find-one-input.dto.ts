import type { IdUuid } from "@/modules/@shared";

/**
 * DTO base para entrada de busca por ID
 */
export class FindOneInput {
  id!: IdUuid;
  selection?: string[];
}
