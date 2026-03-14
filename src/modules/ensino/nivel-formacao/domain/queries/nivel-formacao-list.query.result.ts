import { PaginationQueryResult } from "@/domain/abstractions";
import { NivelFormacaoFindOneQueryResult } from "./nivel-formacao-find-one.query.result";

export class NivelFormacaoListQueryResult extends PaginationQueryResult<NivelFormacaoFindOneQueryResult> {}
