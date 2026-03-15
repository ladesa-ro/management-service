import type { IdUuid } from "@/domain/abstractions/scalars/id-uuid";
import { DatedQueryResult } from "./dated.query.result";

/**
 * Base para query result de entidade com ID e campos de data.
 * Todos os FindOneQueryResult devem estender esta classe.
 */
export class EntityQueryResult extends DatedQueryResult {
  id!: IdUuid;
}
