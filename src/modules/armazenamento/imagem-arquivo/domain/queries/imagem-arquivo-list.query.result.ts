import { PaginationQueryResult } from "@/domain/abstractions";
import { ImagemArquivoFindOneQueryResult } from "./imagem-arquivo-find-one.query.result";

export class ImagemArquivoListQueryResult extends PaginationQueryResult<ImagemArquivoFindOneQueryResult> {}
