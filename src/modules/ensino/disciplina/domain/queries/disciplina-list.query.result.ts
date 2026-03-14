import { PaginationQueryResult } from "@/domain/abstractions";
import { DisciplinaFindOneQueryResult } from "./disciplina-find-one.query.result";

export class DisciplinaListQueryResult extends PaginationQueryResult<DisciplinaFindOneQueryResult> {}
