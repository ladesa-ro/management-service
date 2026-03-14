import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { PerfilListQuery } from "./perfil-list.query";
import type { PerfilListQueryResult } from "./perfil-list.query.result";
export type IPerfilListQuery = {
  accessContext: AccessContext;
  dto: PerfilListQuery | null;
  selection?: string[] | boolean;
};

export type IPerfilListQueryHandler = IQueryHandler<IPerfilListQuery, PerfilListQueryResult>;
export const IPerfilListQueryHandler = Symbol("IPerfilListQueryHandler");
