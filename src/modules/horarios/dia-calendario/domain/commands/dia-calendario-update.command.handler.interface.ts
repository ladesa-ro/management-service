import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiaCalendarioFindOneQuery, DiaCalendarioFindOneQueryResult } from "../queries";
import type { DiaCalendarioUpdateCommand } from "./dia-calendario-update.command";
export type IDiaCalendarioUpdateCommand = {
  accessContext: AccessContext;
  dto: DiaCalendarioFindOneQuery & DiaCalendarioUpdateCommand;
};

export type IDiaCalendarioUpdateCommandHandler = ICommandHandler<
  IDiaCalendarioUpdateCommand,
  DiaCalendarioFindOneQueryResult
>;
export const IDiaCalendarioUpdateCommandHandler = Symbol("IDiaCalendarioUpdateCommandHandler");
