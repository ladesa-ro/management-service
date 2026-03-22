import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { PerfilListQuery } from "./perfil-list.query";
import type { PerfilListQueryResult } from "./perfil-list.query.result";

export const PerfilListQueryMetadata = createOperationMetadata({
  operationId: "perfilFindAll",
  summary: "Lista perfis de um usuario",
});

export const IPerfilListQueryHandler = Symbol("IPerfilListQueryHandler");

export type IPerfilListQueryHandler = IQueryHandler<PerfilListQuery | null, PerfilListQueryResult>;
