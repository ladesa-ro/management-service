import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioFindOneQuery, DiarioFindOneQueryResult } from "../queries";
import type { DiarioUpdateCommand } from "./diario-update.command";
export type IDiarioUpdateCommand = {
  accessContext: AccessContext;
  dto: DiarioFindOneQuery & DiarioUpdateCommand;
};

export type IDiarioUpdateCommandHandler = ICommandHandler<
  IDiarioUpdateCommand,
  DiarioFindOneQueryResult
>;
export const IDiarioUpdateCommandHandler = Symbol("IDiarioUpdateCommandHandler");
