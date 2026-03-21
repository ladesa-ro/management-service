import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { PerfilListQuery } from "./perfil-list.query";
import type { PerfilListQueryResult } from "./perfil-list.query.result";

export const IPerfilListQueryHandler = Symbol("IPerfilListQueryHandler");

export type IPerfilListQueryHandler = IQueryHandler<PerfilListQuery | null, PerfilListQueryResult>;
