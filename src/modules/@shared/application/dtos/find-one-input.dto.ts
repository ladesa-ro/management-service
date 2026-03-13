import type { IdUuid } from "@/modules/@shared";

/**
 * DTO base para entrada de busca por ID
 */
export class FindOneInputDto {
  id!: IdUuid;
  selection?: string[];
}
