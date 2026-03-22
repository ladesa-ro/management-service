import type { IQueryHandler } from "@/domain/abstractions";
import type { CampusListQuery } from "./campus-list.query";
import type { CampusListQueryResult } from "./campus-list.query.result";

export const ICampusListQueryHandler = Symbol("ICampusListQueryHandler");

export type ICampusListQueryHandler = IQueryHandler<CampusListQuery | null, CampusListQueryResult>;
