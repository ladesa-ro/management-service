import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { UsuarioFindOneQuery } from "./usuario-find-one.query";
import type { UsuarioFindOneQueryResult } from "./usuario-find-one.query.result";

export const UsuarioFindByIdSimpleQueryMetadata = createOperationMetadata({
  operationId: "usuarioFindByIdSimple",
  summary: "Busca um usuario por ID (simplificado)",
});

export const IUsuarioFindByIdSimpleQueryHandler = Symbol("IUsuarioFindByIdSimpleQueryHandler");

export type IUsuarioFindByIdSimpleQueryHandler = IQueryHandler<
  UsuarioFindOneQuery,
  UsuarioFindOneQueryResult | null
>;
