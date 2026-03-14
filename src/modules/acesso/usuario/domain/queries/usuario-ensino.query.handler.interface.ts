import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioEnsinoQueryResult } from "./usuario-ensino.query.result";
import type { UsuarioFindOneQuery } from "./usuario-find-one.query";
export type IUsuarioEnsinoQuery = {
  accessContext: AccessContext | null;
  dto: UsuarioFindOneQuery;
  selection?: string[] | boolean;
};

export type IUsuarioEnsinoQueryHandler = IQueryHandler<
  IUsuarioEnsinoQuery,
  UsuarioEnsinoQueryResult
>;
export const IUsuarioEnsinoQueryHandler = Symbol("IUsuarioEnsinoQueryHandler");
