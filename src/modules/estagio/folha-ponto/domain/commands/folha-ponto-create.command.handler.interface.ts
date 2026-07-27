import type { IAccessContext } from "@/domain/abstractions";
import type { FolhaPontoFindOneQueryResult } from "../queries/folha-ponto-find-one.query.result";
import type { FolhaPontoCreateCommand } from "./folha-ponto-create.command";

export const IFolhaPontoCreateCommandHandler = Symbol("IFolhaPontoCreateCommandHandler");

export interface IFolhaPontoCreateCommandHandler {
  execute(
    accessContext: IAccessContext | null,
    dto: FolhaPontoCreateCommand,
  ): Promise<FolhaPontoFindOneQueryResult>;
}
