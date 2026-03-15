import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiaCalendarioFindOneQuery } from "../queries";

export type IDiaCalendarioDeleteCommandHandler = ICommandHandler<
  DiaCalendarioFindOneQuery,
  boolean
>;
export const IDiaCalendarioDeleteCommandHandler = Symbol("IDiaCalendarioDeleteCommandHandler");
