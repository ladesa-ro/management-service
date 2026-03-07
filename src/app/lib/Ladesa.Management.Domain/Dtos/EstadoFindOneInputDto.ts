import type { IdNumeric } from "@/Ladesa.Management.Domain/Abstractions/Scalars";

export class EstadoFindOneInputDto {
  id!: IdNumeric;
  selection?: string[];
}
