import { PaginationQueryResult } from "@/domain/abstractions";
import { AmbienteFindOneQueryResult } from "./ambiente-find-one.query.result";

export class AmbienteListQueryResult extends PaginationQueryResult<AmbienteFindOneQueryResult> {}
