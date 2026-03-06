import type { IdUuid } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import { DatedOutputDto } from "./dated-output.dto";

/**
 * DTO base para output de entidade com ID e campos de data.
 * Todos os FindOneOutput devem estender esta classe.
 */
export class EntityOutputDto extends DatedOutputDto {
  id!: IdUuid;
}
