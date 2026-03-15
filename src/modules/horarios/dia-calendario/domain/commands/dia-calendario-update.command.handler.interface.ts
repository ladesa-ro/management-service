import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiaCalendarioFindOneQuery, DiaCalendarioFindOneQueryResult } from "../queries";
import type { DiaCalendarioUpdateCommand } from "./dia-calendario-update.command";

export type IDiaCalendarioUpdateCommandHandler = ICommandHandler<
  DiaCalendarioFindOneQuery & DiaCalendarioUpdateCommand,
  DiaCalendarioFindOneQueryResult
>;
export const IDiaCalendarioUpdateCommandHandler = Symbol("IDiaCalendarioUpdateCommandHandler");
