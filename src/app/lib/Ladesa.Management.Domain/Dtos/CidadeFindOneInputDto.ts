import type { IdNumeric } from "@/Ladesa.Management.Domain/Abstractions/Scalars";

export class CidadeFindOneInputDto {
  id!: IdNumeric;
  selection?: string[];
}
