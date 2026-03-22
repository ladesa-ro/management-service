import type { IQueryHandler } from "@/domain/abstractions";
import type { UsuarioListQuery } from "./usuario-list.query";
import type { UsuarioListQueryResult } from "./usuario-list.query.result";

export const IUsuarioListQueryHandler = Symbol("IUsuarioListQueryHandler");

export type IUsuarioListQueryHandler = IQueryHandler<
  UsuarioListQuery | null,
  UsuarioListQueryResult
>;
