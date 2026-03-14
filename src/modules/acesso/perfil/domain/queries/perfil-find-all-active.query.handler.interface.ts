import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { PerfilFindOneQueryResult } from "./perfil-find-one.query.result";
export type IPerfilFindAllActiveQuery = {
  accessContext: AccessContext | null;
  usuarioId: string;
};

export type IPerfilFindAllActiveQueryHandler = IQueryHandler<
  IPerfilFindAllActiveQuery,
  PerfilFindOneQueryResult[]
>;
export const IPerfilFindAllActiveQueryHandler = Symbol("IPerfilFindAllActiveQueryHandler");
