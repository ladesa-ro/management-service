import type { IdUuid } from "@/modules/@shared/domain/abstractions/scalars.types";
import { DatedQueryResult } from "./dated-query-result";

/**
 * Base para query result de entidade com ID e campos de data.
 * Todos os FindOneQueryResult devem estender esta classe.
 */
export class EntityQueryResult extends DatedQueryResult {
  id!: IdUuid;
}
