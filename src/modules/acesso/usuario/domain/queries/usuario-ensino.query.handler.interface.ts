import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioEnsinoQueryResult } from "./usuario-ensino.query.result";
import type { UsuarioFindOneQuery } from "./usuario-find-one.query";

export type IUsuarioEnsinoQueryHandler = IQueryHandler<
  UsuarioFindOneQuery,
  UsuarioEnsinoQueryResult
>;
export const IUsuarioEnsinoQueryHandler = Symbol("IUsuarioEnsinoQueryHandler");
