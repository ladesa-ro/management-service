import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusListQuery } from "./campus-list.query";
import type { CampusListQueryResult } from "./campus-list.query.result";

export type ICampusListQueryHandler = IQueryHandler<CampusListQuery | null, CampusListQueryResult>;
export const ICampusListQueryHandler = Symbol("ICampusListQueryHandler");
