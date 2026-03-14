import { PaginationQueryResult } from "@/domain/abstractions";
import { EnderecoFindOneQueryResult } from "./endereco-find-one.query.result";

export class EnderecoListQueryResult extends PaginationQueryResult<EnderecoFindOneQueryResult> {}
