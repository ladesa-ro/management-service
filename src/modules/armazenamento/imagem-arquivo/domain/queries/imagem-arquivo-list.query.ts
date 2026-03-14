import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class ImagemArquivoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.imagem.id"?: IFilterAcceptableValues;
}
