import type { IQueryHandler } from "@/domain/abstractions";
import type { UsuarioEnsinoQueryResult } from "./usuario-ensino.query.result";
import type { UsuarioFindOneQuery } from "./usuario-find-one.query";

export const IUsuarioEnsinoQueryHandler = Symbol("IUsuarioEnsinoQueryHandler");

export type IUsuarioEnsinoQueryHandler = IQueryHandler<
  UsuarioFindOneQuery,
  UsuarioEnsinoQueryResult
>;
