import type { IQueryHandler } from "@/domain/abstractions";
import type { PerfilFindOneQueryResult } from "./perfil-find-one.query.result";

export type IPerfilFindAllActiveQuery = {
  usuarioId: string;
};

export const IPerfilFindAllActiveQueryHandler = Symbol("IPerfilFindAllActiveQueryHandler");

export type IPerfilFindAllActiveQueryHandler = IQueryHandler<
  IPerfilFindAllActiveQuery,
  PerfilFindOneQueryResult[]
>;
