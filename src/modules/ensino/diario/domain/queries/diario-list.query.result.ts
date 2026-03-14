import { PaginationQueryResult } from "@/domain/abstractions";
import { DiarioFindOneQueryResult } from "./diario-find-one.query.result";

export class DiarioListQueryResult extends PaginationQueryResult<DiarioFindOneQueryResult> {}
