import type { IPaginationResult } from "@/application/pagination";
import type { FolhaPontoFindOneQueryResult } from "./folha-ponto-find-one.query.result";

export type FolhaPontoListQueryResult = IPaginationResult<FolhaPontoFindOneQueryResult>;
