import { PaginationQueryResult } from "@/domain/abstractions";
import { CalendarioIndisponibilidadeProfessorFindOneQueryResult } from "./calendario-indisponibilidade-professor-find-one.query.result";

export class CalendarioIndisponibilidadeProfessorListQueryResult extends PaginationQueryResult<CalendarioIndisponibilidadeProfessorFindOneQueryResult> {}
