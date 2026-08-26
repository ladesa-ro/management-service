import type { IPaginationResult } from "@/application/pagination";
import type { RelatorioFindOneQueryResult } from "./relatorio-find-one.query.result";

export type RelatorioListQueryResult = IPaginationResult<RelatorioFindOneQueryResult>;
