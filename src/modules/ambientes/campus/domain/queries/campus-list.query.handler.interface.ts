import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CampusListQuery } from "./campus-list.query";
import type { CampusListQueryResult } from "./campus-list.query.result";

export const CampusListQueryMetadata = createOperationMetadata({
  operationId: "campusFindAll",
  summary: "Lista campi",
});

export const ICampusListQueryHandler = Symbol("ICampusListQueryHandler");

export type ICampusListQueryHandler = IQueryHandler<CampusListQuery | null, CampusListQueryResult>;
