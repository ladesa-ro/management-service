import { PaginationQueryResult } from "@/domain/abstractions";
import { CalendarioColecaoFindOneQueryResult } from "./calendario-colecao-find-one.query.result";

export class CalendarioColecaoListQueryResult extends PaginationQueryResult<CalendarioColecaoFindOneQueryResult> {}
