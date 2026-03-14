import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioFindOneQueryResult } from "../queries";
import type { DiarioCreateCommand } from "./diario-create.command";
export type IDiarioCreateCommand = {
  accessContext: AccessContext;
  dto: DiarioCreateCommand;
};

export type IDiarioCreateCommandHandler = ICommandHandler<
  IDiarioCreateCommand,
  DiarioFindOneQueryResult
>;
export const IDiarioCreateCommandHandler = Symbol("IDiarioCreateCommandHandler");
