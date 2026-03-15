import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiaCalendarioFindOneQueryResult } from "../queries";
import type { DiaCalendarioCreateCommand } from "./dia-calendario-create.command";

export type IDiaCalendarioCreateCommandHandler = ICommandHandler<
  DiaCalendarioCreateCommand,
  DiaCalendarioFindOneQueryResult
>;
export const IDiaCalendarioCreateCommandHandler = Symbol("IDiaCalendarioCreateCommandHandler");
