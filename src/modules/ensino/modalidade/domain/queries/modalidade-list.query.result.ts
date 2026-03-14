import { PaginationQueryResult } from "@/domain/abstractions";
import { ModalidadeFindOneQueryResult } from "./modalidade-find-one.query.result";

export class ModalidadeListQueryResult extends PaginationQueryResult<ModalidadeFindOneQueryResult> {}
