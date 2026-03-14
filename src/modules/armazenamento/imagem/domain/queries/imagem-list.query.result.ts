import { PaginationQueryResult } from "@/domain/abstractions";
import { ImagemFindOneQueryResult } from "./imagem-find-one.query.result";

export class ImagemListQueryResult extends PaginationQueryResult<ImagemFindOneQueryResult> {}
