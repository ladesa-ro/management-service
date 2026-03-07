import type { IdNumeric } from "@/Ladesa.Management.Domain/Abstractions/Scalars";

export class EstadoFindOneOutputDto {
  id!: IdNumeric;
  nome!: string;
  sigla!: string;
}
