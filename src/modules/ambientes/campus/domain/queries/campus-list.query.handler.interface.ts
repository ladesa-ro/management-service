import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CampusListQuery } from "./campus-list.query";
import type { CampusListQueryResult } from "./campus-list.query.result";

export const CampusListQueryMetadata = createOperationMetadata({
  operationId: "campusFindAll",
  summary: "Lista campi",
});

export const ICampusListQueryHandler = Symbol("ICampusListQueryHandler");

export type ICampusListQueryHandler = IQueryHandler<CampusListQuery | null, CampusListQueryResult>;

export const campusPaginationSpec: IPaginationSpec = {
  sortableColumns: [
    "id",
    "nomeFantasia",
    "razaoSocial",
    "apelido",
    "cnpj",
    "dateCreated",
    "endereco.cidade.id",
    "endereco.cidade.nome",
    "endereco.cidade.estado.id",
    "endereco.cidade.estado.nome",
    "endereco.cidade.estado.sigla",
  ],
  searchableColumns: [
    "id",
    "nomeFantasia",
    "razaoSocial",
    "apelido",
    "cnpj",
    "dateCreated",
    "endereco.cidade.nome",
    "endereco.cidade.estado.nome",
    "endereco.cidade.estado.sigla",
  ],
  defaultSortBy: [
    ["nomeFantasia", "ASC"],
    ["endereco.cidade.estado.nome", "ASC"],
    ["dateCreated", "ASC"],
  ],
  filterableColumns: {
    "endereco.cidade.id": [PaginationFilter.EQ],
    "endereco.cidade.nome": [PaginationFilter.EQ],
    "endereco.cidade.estado.id": [PaginationFilter.EQ],
    "endereco.cidade.estado.nome": [PaginationFilter.EQ],
    "endereco.cidade.estado.sigla": [PaginationFilter.EQ],
  },
};
