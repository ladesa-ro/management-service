import { PaginationQueryResult } from "@/domain/abstractions";
import { EmpresaAvaliacaoFindOneQueryResult } from "./empresa-avaliacao-find-one.query.result";

export class EmpresaAvaliacaoListQueryResult extends PaginationQueryResult<EmpresaAvaliacaoFindOneQueryResult> {}
