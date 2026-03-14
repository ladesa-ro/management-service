import { PaginationQueryResult } from "@/domain/abstractions";
import { CampusFindOneQueryResult } from "./campus-find-one.query.result";

export class CampusListQueryResult extends PaginationQueryResult<CampusFindOneQueryResult> {}
