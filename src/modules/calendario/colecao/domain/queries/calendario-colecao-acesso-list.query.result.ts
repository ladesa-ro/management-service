import { PaginationQueryResult } from "@/domain/abstractions";
import { CalendarioColecaoAcessoFindOneQueryResult } from "./calendario-colecao-acesso-find-one.query.result";

export class CalendarioColecaoAcessoListQueryResult extends PaginationQueryResult<CalendarioColecaoAcessoFindOneQueryResult> {}
