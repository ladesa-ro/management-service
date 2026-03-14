import { PaginationQueryResult } from "@/domain/abstractions";
import { BlocoFindOneQueryResult } from "./bloco-find-one.query.result";

export class BlocoListQueryResult extends PaginationQueryResult<BlocoFindOneQueryResult> {}
