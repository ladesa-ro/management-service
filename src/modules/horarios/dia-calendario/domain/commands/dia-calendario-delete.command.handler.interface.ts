import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiaCalendarioFindOneQuery } from "../queries";
export type IDiaCalendarioDeleteCommand = {
  accessContext: AccessContext;
  dto: DiaCalendarioFindOneQuery;
};

export type IDiaCalendarioDeleteCommandHandler = ICommandHandler<
  IDiaCalendarioDeleteCommand,
  boolean
>;
export const IDiaCalendarioDeleteCommandHandler = Symbol("IDiaCalendarioDeleteCommandHandler");
