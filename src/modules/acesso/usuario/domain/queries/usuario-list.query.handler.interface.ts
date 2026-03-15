import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioListQuery } from "./usuario-list.query";
import type { UsuarioListQueryResult } from "./usuario-list.query.result";

export type IUsuarioListQueryHandler = IQueryHandler<
  UsuarioListQuery | null,
  UsuarioListQueryResult
>;
export const IUsuarioListQueryHandler = Symbol("IUsuarioListQueryHandler");
