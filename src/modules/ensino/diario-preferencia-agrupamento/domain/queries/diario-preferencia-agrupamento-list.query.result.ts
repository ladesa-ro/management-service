import { PaginationQueryResult } from "@/domain/abstractions";
import { DiarioPreferenciaAgrupamentoFindOneQueryResult } from "./diario-preferencia-agrupamento-find-one.query.result";

export class DiarioPreferenciaAgrupamentoListQueryResult extends PaginationQueryResult<DiarioPreferenciaAgrupamentoFindOneQueryResult> {}
