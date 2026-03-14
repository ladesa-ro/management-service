import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusListQuery } from "./campus-list.query";
import type { CampusListQueryResult } from "./campus-list.query.result";
export type ICampusListQuery = {
  accessContext: AccessContext;
  dto: CampusListQuery | null;
  selection?: string[] | boolean;
};

export type ICampusListQueryHandler = IQueryHandler<ICampusListQuery, CampusListQueryResult>;
export const ICampusListQueryHandler = Symbol("ICampusListQueryHandler");
