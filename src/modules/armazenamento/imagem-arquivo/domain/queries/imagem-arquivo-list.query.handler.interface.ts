import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { ImagemArquivoListQuery } from "./imagem-arquivo-list.query";
import type { ImagemArquivoListQueryResult } from "./imagem-arquivo-list.query.result";

export const ImagemArquivoListQueryMetadata = createOperationMetadata({
  operationId: "imagemArquivoFindAll",
  summary: "Lista imagens de arquivo",
});

export const IImagemArquivoListQueryHandler = Symbol("IImagemArquivoListQueryHandler");

export type IImagemArquivoListQueryHandler = IQueryHandler<
  ImagemArquivoListQuery | null,
  ImagemArquivoListQueryResult
>;

export const imagemArquivoPaginationSpec: IPaginationSpec = {
  sortableColumns: ["id", "dateCreated"],
  searchableColumns: ["id"],
  defaultSortBy: [["dateCreated", "DESC"]],
  filterableColumns: {
    id: [PaginationFilter.EQ],
    "imagem.id": [PaginationFilter.EQ],
  },
};
