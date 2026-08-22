import { PaginationQueryResult } from "@/domain/abstractions";
import { TurmaMatriculaFindOneQueryResult } from "./turma-matricula-find-one.query.result";

export class TurmaMatriculaListQueryResult extends PaginationQueryResult<TurmaMatriculaFindOneQueryResult> {}
