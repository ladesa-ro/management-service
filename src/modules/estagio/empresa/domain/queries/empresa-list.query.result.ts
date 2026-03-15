import { PaginationQueryResult } from "@/domain/abstractions";
import { EmpresaFindOneQueryResult } from "./empresa-find-one.query.result";

export class EmpresaListQueryResult extends PaginationQueryResult<EmpresaFindOneQueryResult> {}
