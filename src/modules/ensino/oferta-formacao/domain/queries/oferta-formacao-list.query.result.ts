import { PaginationQueryResult } from "@/domain/abstractions";
import { OfertaFormacaoFindOneQueryResult } from "./oferta-formacao-find-one.query.result";

export class OfertaFormacaoListQueryResult extends PaginationQueryResult<OfertaFormacaoFindOneQueryResult> {}
