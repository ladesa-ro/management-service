import { PaginationQueryResult } from "@/domain/abstractions";
import { CidadeFindOneQueryResult } from "./cidade-find-one.query.result";

export class CidadeListQueryResult extends PaginationQueryResult<CidadeFindOneQueryResult> {}
