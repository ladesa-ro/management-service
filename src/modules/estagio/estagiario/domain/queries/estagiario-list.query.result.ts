import { PaginationQueryResult } from "@/domain/abstractions";
import { EstagiarioFindOneQueryResult } from "./estagiario-find-one.query.result";

export class EstagiarioListQueryResult extends PaginationQueryResult<EstagiarioFindOneQueryResult> {}
