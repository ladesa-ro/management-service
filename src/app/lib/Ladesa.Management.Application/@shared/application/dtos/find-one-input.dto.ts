import type { IdUuid } from "@/Ladesa.Management.Application/@shared";

/**
 * DTO base para entrada de busca por ID
 */
export class FindOneInputDto {
  id!: IdUuid;
  selection?: string[];
}
