/**
 * SharedFields — campos compartilhados entre todas as entidades.
 *
 * Inclui id (uuid/numerico), datas de auditoria, paginacao (page, limit, search,
 * sortBy, filterId) e metadados de resultado (meta, data).
 *
 * Importar { SharedFields } ou { SharedListFields } conforme necessidade.
 */
import { z } from "zod";
import { createFieldMetadata } from "./field-metadata";

const uuidSchema = z.string().uuid();
const dateTimeSchema = z.string().datetime();
const pageSchema = z.number().int().min(1).optional().default(1);
const limitSchema = z.number().int().min(1).optional();
const searchSchema = z.string().optional();
const sortBySchema = z.array(z.string()).optional();
const filterIdSchema = z.array(z.string()).optional();

export const SharedFields = {
  idUuid: createFieldMetadata({
    description: "Identificador do registro (uuid)",
    schema: uuidSchema,
  }),
  idNumeric: createFieldMetadata({
    description: "Identificador do registro (numerico)",
    schema: z.number().int(),
  }),
  dateCreated: createFieldMetadata({
    description: "Data e hora da criacao do registro",
    schema: dateTimeSchema,
  }),
  dateUpdated: createFieldMetadata({
    description: "Data e hora da alteracao do registro",
    schema: dateTimeSchema,
  }),
  dateDeleted: createFieldMetadata({
    description: "Data e hora da exclusao do registro",
    schema: dateTimeSchema.nullable(),
    nullable: true,
  }),
  page: createFieldMetadata({
    description: "Pagina de consulta",
    schema: pageSchema,
    nullable: true,
    defaultValue: 1,
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
  filterId: SharedFields.filterId,
  meta: SharedFields.meta,
  data: SharedFields.data,
};

/** Campos de paginacao para DTOs de output (nao-nullable). */
export const SharedPaginationOutputFields = {
  itemsPerPage: createFieldMetadata({
    description: "Quantidade de itens por pagina",
    schema: z.number().int().min(1),
  }),
  totalItems: createFieldMetadata({
    description: "Total de itens",
    schema: z.number().int(),
  }),
  currentPage: createFieldMetadata({
    description: "Pagina atual",
    schema: z.number().int().min(1),
  }),
  totalPages: createFieldMetadata({
    description: "Quantidade total de paginas",
    schema: z.number().int(),
  }),
  search: createFieldMetadata({
    description: "Termo textual da busca",
    schema: z.string(),
  }),
};
