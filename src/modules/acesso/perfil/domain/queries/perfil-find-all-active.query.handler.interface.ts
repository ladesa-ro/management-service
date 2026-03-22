import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { PerfilFindOneQueryResult } from "./perfil-find-one.query.result";

export const PerfilFindAllActiveQueryMetadata = createOperationMetadata({
  operationId: "perfilFindAllActive",
  summary: "Lista perfis ativos de um usuario",
});

export type IPerfilFindAllActiveQuery = {
  usuarioId: string;
};

export const IPerfilFindAllActiveQueryHandler = Symbol("IPerfilFindAllActiveQueryHandler");

export type IPerfilFindAllActiveQueryHandler = IQueryHandler<
  IPerfilFindAllActiveQuery,
  PerfilFindOneQueryResult[]
>;
