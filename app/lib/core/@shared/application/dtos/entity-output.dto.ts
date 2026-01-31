import type { IdUuid } from "@/core/@shared/domain/scalars.types";
import { DatedOutput } from "./dated-output.dto";

/**
 * DTO base para output de entidade com ID e campos de data.
 * Todos os FindOneOutput devem estender esta classe.
 */
export class EntityOutput extends DatedOutput {
  id!: IdUuid;
}
