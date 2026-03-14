import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiaCalendarioFindOneQueryResult } from "../queries";
import type { DiaCalendarioCreateCommand } from "./dia-calendario-create.command";
export type IDiaCalendarioCreateCommand = {
  accessContext: AccessContext;
  dto: DiaCalendarioCreateCommand;
};

export type IDiaCalendarioCreateCommandHandler = ICommandHandler<
  IDiaCalendarioCreateCommand,
  DiaCalendarioFindOneQueryResult
>;
export const IDiaCalendarioCreateCommandHandler = Symbol("IDiaCalendarioCreateCommandHandler");
