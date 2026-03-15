import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery } from "./usuario-find-one.query";
import type { UsuarioFindOneQueryResult } from "./usuario-find-one.query.result";

export type IUsuarioFindOneQueryHandler = IQueryHandler<
  UsuarioFindOneQuery,
  UsuarioFindOneQueryResult | null
>;
export const IUsuarioFindOneQueryHandler = Symbol("IUsuarioFindOneQueryHandler");
