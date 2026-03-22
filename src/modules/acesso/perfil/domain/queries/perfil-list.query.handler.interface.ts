import type { IQueryHandler } from "@/domain/abstractions";
import type { PerfilListQuery } from "./perfil-list.query";
import type { PerfilListQueryResult } from "./perfil-list.query.result";

export const IPerfilListQueryHandler = Symbol("IPerfilListQueryHandler");

export type IPerfilListQueryHandler = IQueryHandler<PerfilListQuery | null, PerfilListQueryResult>;
