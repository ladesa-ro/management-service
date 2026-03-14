import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusFindOneQuery } from "../queries";
export type ICampusDeleteCommand = {
  accessContext: AccessContext;
  dto: CampusFindOneQuery;
};

export type ICampusDeleteCommandHandler = ICommandHandler<ICampusDeleteCommand, boolean>;
export const ICampusDeleteCommandHandler = Symbol("ICampusDeleteCommandHandler");
