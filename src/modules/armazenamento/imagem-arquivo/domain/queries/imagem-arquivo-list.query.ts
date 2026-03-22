import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const ImagemArquivoListQueryFields = {
  ...SharedListFields,
  filterImagemId: createFieldMetadata({ description: "Filtro por ID da Imagem", nullable: true }),
};

export class ImagemArquivoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.imagem.id"?: IFilterAcceptableValues;
}
