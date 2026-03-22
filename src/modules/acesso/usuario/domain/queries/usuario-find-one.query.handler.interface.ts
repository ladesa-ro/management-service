import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { UsuarioFindOneQuery } from "./usuario-find-one.query";
import type { UsuarioFindOneQueryResult } from "./usuario-find-one.query.result";

export const UsuarioFindOneQueryMetadata = createOperationMetadata({
  operationId: "usuarioFindById",
  summary: "Busca um usuario por ID",
});

export const IUsuarioFindOneQueryHandler = Symbol("IUsuarioFindOneQueryHandler");

export type IUsuarioFindOneQueryHandler = IQueryHandler<
  UsuarioFindOneQuery,
  UsuarioFindOneQueryResult | null
>;
