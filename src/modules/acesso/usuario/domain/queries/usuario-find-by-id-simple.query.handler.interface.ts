import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery } from "./usuario-find-one.query";
import type { UsuarioFindOneQueryResult } from "./usuario-find-one.query.result";
export type IUsuarioFindByIdSimpleQuery = {
  accessContext: AccessContext;
  id: UsuarioFindOneQuery["id"];
  selection?: string[];
};

export type IUsuarioFindByIdSimpleQueryHandler = IQueryHandler<
  IUsuarioFindByIdSimpleQuery,
  UsuarioFindOneQueryResult | null
>;
export const IUsuarioFindByIdSimpleQueryHandler = Symbol("IUsuarioFindByIdSimpleQueryHandler");
