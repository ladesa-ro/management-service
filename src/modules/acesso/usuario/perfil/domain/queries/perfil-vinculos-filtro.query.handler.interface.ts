import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { PerfilFindOneQueryResult } from "./perfil-find-one.query.result";
import type { PerfilVinculosFiltroQuery } from "./perfil-vinculos-filtro.query";

export const PerfilVinculosFiltroQueryMetadata = createOperationMetadata({
  operationId: "perfilVinculosFiltro",
  summary: "Busca vínculos de perfis com filtros específicos de campus, cargo e curso",
});

export const IPerfilVinculosFiltroQueryHandler = Symbol("IPerfilVinculosFiltroQueryHandler");

export type IPerfilVinculosFiltroQueryHandler = IQueryHandler<
  PerfilVinculosFiltroQuery | null,
  PerfilFindOneQueryResult[]
>;
