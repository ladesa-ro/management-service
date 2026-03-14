import { PaginationQueryResult } from "@/domain/abstractions";
import { TurmaFindOneQueryResult } from "./turma-find-one.query.result";

export class TurmaListQueryResult extends PaginationQueryResult<TurmaFindOneQueryResult> {}
