import { PaginationQueryResult } from "@/domain/abstractions";
import { CalendarioLetivoDiaFindOneQueryResult } from "./calendario-letivo-dia-find-one.query.result";

export class CalendarioLetivoDiaListQueryResult extends PaginationQueryResult<CalendarioLetivoDiaFindOneQueryResult> {}
