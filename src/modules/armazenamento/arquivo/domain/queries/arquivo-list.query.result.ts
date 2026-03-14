import { PaginationQueryResult } from "@/domain/abstractions";
import { ArquivoFindOneQueryResult } from "./arquivo-find-one.query.result";

export class ArquivoListQueryResult extends PaginationQueryResult<ArquivoFindOneQueryResult> {}
