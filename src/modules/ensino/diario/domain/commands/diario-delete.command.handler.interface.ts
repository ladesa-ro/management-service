import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioFindOneQuery } from "../queries";
export type IDiarioDeleteCommand = {
  accessContext: AccessContext;
  dto: DiarioFindOneQuery;
};

export type IDiarioDeleteCommandHandler = ICommandHandler<IDiarioDeleteCommand, boolean>;
export const IDiarioDeleteCommandHandler = Symbol("IDiarioDeleteCommandHandler");
