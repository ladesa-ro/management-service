import { PaginationQueryResult } from "@/domain/abstractions";
import { PerfilFindOneQueryResult } from "./perfil-find-one.query.result";

export class PerfilListQueryResult extends PaginationQueryResult<PerfilFindOneQueryResult> {}
