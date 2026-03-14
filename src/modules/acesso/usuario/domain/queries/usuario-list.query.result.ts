import { PaginationQueryResult } from "@/domain/abstractions";
import { UsuarioFindOneQueryResult } from "./usuario-find-one.query.result";

export class UsuarioListQueryResult extends PaginationQueryResult<UsuarioFindOneQueryResult> {}
