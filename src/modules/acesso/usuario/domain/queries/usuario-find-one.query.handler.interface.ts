import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery } from "./usuario-find-one.query";
import type { UsuarioFindOneQueryResult } from "./usuario-find-one.query.result";
export type IUsuarioFindOneQuery = {
  accessContext: AccessContext | null;
  dto: UsuarioFindOneQuery;
  selection?: string[] | boolean;
};

export type IUsuarioFindOneQueryHandler = IQueryHandler<
  IUsuarioFindOneQuery,
  UsuarioFindOneQueryResult | null
>;
export const IUsuarioFindOneQueryHandler = Symbol("IUsuarioFindOneQueryHandler");
