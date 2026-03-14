import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneQuery } from "../queries";
export type IBlocoDeleteCommand = {
  accessContext: AccessContext;
  dto: BlocoFindOneQuery;
};

export type IBlocoDeleteCommandHandler = ICommandHandler<IBlocoDeleteCommand, boolean>;
export const IBlocoDeleteCommandHandler = Symbol("IBlocoDeleteCommandHandler");
