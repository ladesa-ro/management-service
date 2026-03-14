import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaFindOneQuery } from "../queries";
export type ITurmaDeleteCommand = {
  accessContext: AccessContext;
  dto: TurmaFindOneQuery;
};

export type ITurmaDeleteCommandHandler = ICommandHandler<ITurmaDeleteCommand, boolean>;
export const ITurmaDeleteCommandHandler = Symbol("ITurmaDeleteCommandHandler");
