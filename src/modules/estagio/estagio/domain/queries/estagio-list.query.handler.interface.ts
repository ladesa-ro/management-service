import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagioListQuery } from "./estagio-list.query";
import type { EstagioListQueryResult } from "./estagio-list.query.result";

export const EstagioListQueryMetadata = createOperationMetadata({
  operationId: "estagioFindAll",
  summary: "Lista estágios",
});

export const IEstagioListQueryHandler = Symbol("IEstagioListQueryHandler");

export type IEstagioListQueryHandler = IQueryHandler<
  EstagioListQuery | null,
  EstagioListQueryResult
>;

export const estagioPaginationSpec: IPaginationSpec = {
  sortableColumns: ["status", "cargaHoraria", "dataInicio", "dataFim", "dateCreated"],
  searchableColumns: [
    "status",
    "nomeSupervisor",
    "emailSupervisor",
    "empresa.nomeFantasia",
    "empresa.razaoSocial",
    "empresa.cnpj",
    "estagiario.perfil.usuario.nome",
    "estagiario.perfil.usuario.matricula",
  ],
  defaultSortBy: [["dateCreated", "DESC"]],
  filterableColumns: {
    "campus.id": [PaginationFilter.EQ, PaginationFilter.NULL, PaginationFilter.NOT_NULL],
    "empresa.id": [PaginationFilter.EQ],
    "empresa.cnpj": [PaginationFilter.EQ],
    "empresa.razaoSocial": [PaginationFilter.EQ, PaginationFilter.ILIKE],
    "empresa.nomeFantasia": [PaginationFilter.EQ, PaginationFilter.ILIKE],
    "estagiario.id": [PaginationFilter.EQ, PaginationFilter.NULL, PaginationFilter.NOT_NULL],
    "estagiario.perfil.usuario.matricula": [PaginationFilter.EQ],
    "estagiario.perfil.usuario.nome": [PaginationFilter.EQ, PaginationFilter.ILIKE],
    "estagiario.curso.id": [PaginationFilter.EQ],
    status: [PaginationFilter.EQ, PaginationFilter.IN],
    nomeSupervisor: [PaginationFilter.EQ, PaginationFilter.ILIKE],
    emailSupervisor: [PaginationFilter.EQ],
    "CursoReferencia.id": [PaginationFilter.EQ],
    "usuarioOrientador.id": [PaginationFilter.EQ],
    "usuarioOrientador.matricula": [PaginationFilter.EQ],
    "usuarioOrientador.nome": [PaginationFilter.EQ, PaginationFilter.ILIKE],
    dataInicio: [PaginationFilter.EQ, PaginationFilter.GTE, PaginationFilter.LTE],
    dataFim: [PaginationFilter.EQ, PaginationFilter.GTE, PaginationFilter.LTE],
    aditivo: [PaginationFilter.EQ],
  },
};
