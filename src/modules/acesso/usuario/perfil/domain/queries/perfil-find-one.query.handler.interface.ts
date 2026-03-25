import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { PerfilFindOneQuery } from "./perfil-find-one.query";
import type { PerfilFindOneQueryResult } from "./perfil-find-one.query.result";

export const PerfilFindOneQueryMetadata = createOperationMetadata({
  operationId: "perfilFindById",
  summary: "Busca um perfil por ID",
});

export const IPerfilFindOneQueryHandler = Symbol("IPerfilFindOneQueryHandler");

export type IPerfilFindOneQueryHandler = IQueryHandler<
  PerfilFindOneQuery,
  PerfilFindOneQueryResult | null
>;
