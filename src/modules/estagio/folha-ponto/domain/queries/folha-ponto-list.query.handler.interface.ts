import type { IAccessContext } from "@/domain/abstractions";
import type { FolhaPontoListQuery } from "./folha-ponto-list.query";
import type { FolhaPontoListQueryResult } from "./folha-ponto-list.query.result";

export const IFolhaPontoListQueryHandler = Symbol("IFolhaPontoListQueryHandler");

export interface IFolhaPontoListQueryHandler {
  execute(
    accessContext: IAccessContext | null,
    dto: FolhaPontoListQuery,
  ): Promise<FolhaPontoListQueryResult>;
}
