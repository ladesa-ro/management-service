import { PaginationQueryResult } from "@/domain/abstractions";
import { CalendarioLetivoFindOneQueryResult } from "./calendario-letivo-find-one.query.result";

export class CalendarioLetivoListQueryResult extends PaginationQueryResult<CalendarioLetivoFindOneQueryResult> {}
