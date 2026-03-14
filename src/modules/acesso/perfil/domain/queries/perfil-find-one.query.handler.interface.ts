import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { PerfilFindOneQuery } from "./perfil-find-one.query";
import type { PerfilFindOneQueryResult } from "./perfil-find-one.query.result";
export type IPerfilFindOneQuery = {
  accessContext: AccessContext;
  dto: PerfilFindOneQuery;
  selection?: string[] | boolean;
};

export type IPerfilFindOneQueryHandler = IQueryHandler<
  IPerfilFindOneQuery,
  PerfilFindOneQueryResult | null
>;
export const IPerfilFindOneQueryHandler = Symbol("IPerfilFindOneQueryHandler");
