import type { IAccessContext } from "@/domain/abstractions";
import type { FolhaPontoFindOneQuery } from "./folha-ponto-find-one.query";
import type { FolhaPontoFindOneQueryResult } from "./folha-ponto-find-one.query.result";

export const IFolhaPontoFindOneQueryHandler = Symbol("IFolhaPontoFindOneQueryHandler");

export interface IFolhaPontoFindOneQueryHandler {
  execute(
    accessContext: IAccessContext | null,
    dto: FolhaPontoFindOneQuery,
  ): Promise<FolhaPontoFindOneQueryResult | null>;
}
