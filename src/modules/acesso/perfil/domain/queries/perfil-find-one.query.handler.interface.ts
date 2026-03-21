import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { PerfilFindOneQuery } from "./perfil-find-one.query";
import type { PerfilFindOneQueryResult } from "./perfil-find-one.query.result";

export const IPerfilFindOneQueryHandler = Symbol("IPerfilFindOneQueryHandler");

export type IPerfilFindOneQueryHandler = IQueryHandler<
  PerfilFindOneQuery,
  PerfilFindOneQueryResult | null
>;
