import { PaginationQueryResult } from "@/domain/abstractions";
import { DiarioProfessorFindOneQueryResult } from "./diario-professor-find-one.query.result";

export class DiarioProfessorListQueryResult extends PaginationQueryResult<DiarioProfessorFindOneQueryResult> {}
