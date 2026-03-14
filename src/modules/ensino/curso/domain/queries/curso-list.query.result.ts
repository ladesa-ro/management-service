import { PaginationQueryResult } from "@/domain/abstractions";
import { CursoFindOneQueryResult } from "./curso-find-one.query.result";

export class CursoListQueryResult extends PaginationQueryResult<CursoFindOneQueryResult> {}
