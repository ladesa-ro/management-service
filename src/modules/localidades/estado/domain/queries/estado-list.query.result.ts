import { PaginationQueryResult } from "@/domain/abstractions";
import { EstadoFindOneQueryResult } from "./estado-find-one.query.result";

export class EstadoListQueryResult extends PaginationQueryResult<EstadoFindOneQueryResult> {}
