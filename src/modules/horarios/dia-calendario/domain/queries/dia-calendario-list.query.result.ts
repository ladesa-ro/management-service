import { PaginationQueryResult } from "@/domain/abstractions";
import { DiaCalendarioFindOneQueryResult } from "./dia-calendario-find-one.query.result";

export class DiaCalendarioListQueryResult extends PaginationQueryResult<DiaCalendarioFindOneQueryResult> {}
