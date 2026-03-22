/**
 * SharedFields — campos compartilhados entre todas as entidades.
 *
 * Inclui id (uuid/numerico), datas de auditoria, paginacao (page, limit, search,
 * sortBy, selection, filterId) e metadados de resultado (meta, data).
 *
 * Importar { SharedFields } ou { SharedListFields } conforme necessidade.
 */
import { z } from "zod";
import { createFieldMetadata } from "./field-metadata";

const pageSchema = z.number().int().min(1).optional().default(1);
const limitSchema = z.number().int().min(1).optional();
const searchSchema = z.string().optional();
const sortBySchema = z.array(z.string()).optional();
const selectionSchema = z.array(z.string()).optional();
const filterIdSchema = z.array(z.string()).optional();

export const SharedFields = {
  idUuid: createFieldMetadata({ description: "Identificador do registro (uuid)" }),
  idNumeric: createFieldMetadata({ description: "Identificador do registro (numerico)" }),
  dateCreated: createFieldMetadata({ description: "Data de criação do registro" }),
  dateUpdated: createFieldMetadata({ description: "Data da última atualização do registro" }),
  dateDeleted: createFieldMetadata({ description: "Data de exclusão do registro" }),
  page: createFieldMetadata({
    description: "Pagina de consulta",
    schema: pageSchema,
    nullable: true,
  }),
  limit: createFieldMetadata({
    description: "Limite da quantidade de resultados por pagina",
    schema: limitSchema,
    nullable: true,
  }),
  search: createFieldMetadata({
    description: "Busca textual",
    schema: searchSchema,
    nullable: true,
  }),
  sortBy: createFieldMetadata({ description: "Ordenação", schema: sortBySchema, nullable: true }),
  selection: createFieldMetadata({
    description: "Seleção de campos",
    schema: selectionSchema,
    nullable: true,
  }),
  filterId: createFieldMetadata({
    description: "Filtro por ID",
    schema: filterIdSchema,
    nullable: true,
  }),
  meta: createFieldMetadata({ description: "Metadados da busca" }),
  data: createFieldMetadata({ description: "Resultados da busca" }),
};

export const SharedListFields = {
  page: SharedFields.page,
  limit: SharedFields.limit,
  search: SharedFields.search,
  sortBy: SharedFields.sortBy,
  selection: SharedFields.selection,
  filterId: SharedFields.filterId,
  meta: SharedFields.meta,
  data: SharedFields.data,
};
