import type { IdNumeric } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import { EstadoFindOneOutputDto } from "./EstadoFindOneOutputDto";

export class CidadeFindOneOutputDto {
  id!: IdNumeric;
  nome!: string;
  estado!: EstadoFindOneOutputDto;
}
