import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioListQuery } from "./usuario-list.query";
import type { UsuarioListQueryResult } from "./usuario-list.query.result";
export type IUsuarioListQuery = {
  accessContext: AccessContext;
  dto: UsuarioListQuery | null;
  selection?: string[] | boolean;
};

export type IUsuarioListQueryHandler = IQueryHandler<IUsuarioListQuery, UsuarioListQueryResult>;
export const IUsuarioListQueryHandler = Symbol("IUsuarioListQueryHandler");
